import express from "express";
import {client} from "@repo/db/client";
import {z} from "zod";
import jwt from "jsonwebtoken";
import {middleware} from "./middleware";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();



const JWT_SECRET = "secret";

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.post("/signup", async(req, res) => {
    const zod = z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(3),
    })

    const parsedData = zod.safeParse(req.body);
    if(!parsedData.success){
        res.status(404).json({"message" : "Invalid Data"});
        return;
    }

    //sending to db
    try{
        const user = await client.user.create({
            data:{
                username : parsedData.data.username,
                password : parsedData.data.password
            }
        })

        res.json({userId : user.id});
    }catch(e){
        res.status(411).json({"message" : "Please try again later"});
    }
    });

    //sign in route
app.post("/signin", async(req, res) => {
    const signInData = z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(3)
    })

    const parsedData = signInData.safeParse(req.body);
    if(!parsedData.success){
        res.status(404).json({"message" : "Invalid Data"});
        return;
    }

    try{
        const user = await client.user.findFirst({
            where:{
                username : parsedData.data.username,
                password : parsedData.data.password
            }
        })
        if(!user){
            res.status(404).json({"message" : "User is not authorized"});
            return;
        }

        const token = jwt.sign({userId: user.id}, JWT_SECRET);
        res.json({token});
    }catch(e){
        res.status(401).json({"message" : "Invalid  Credentials"});
    }
});

//images route
app.post("/image",middleware, async(req, res) => {

    try{

        const schema= z.object({
            prompt: z.string().min(5).max(500)
        })
    
        const parsedData = schema.safeParse(req.body);
        if(!parsedData.success){
            res.status(404).json({"message" : "Invalid Data"});
            return;
        }
        const payload = {
            prompt: parsedData.data.prompt,
            n: 1,
            size: "1024x1024",
            output_format: "webp"
          };
          
          const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
            axios.toFormData(payload, new FormData()),
            {
              validateStatus: undefined,
              responseType: "arraybuffer",
              headers: { 
                Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, 
                Accept: "image/*" 
              },
            },
          );
          
          //saving image
          const timestamp = Date.now();
          const filename = `image_${timestamp}.webp`;
          const filepath = `./uploads/${filename}`;
          
          // Create uploads directory if it doesn't exist
          if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
          }
    
          // Write image to file
          fs.writeFileSync(filepath, Buffer.from(response.data));
       
    
        //save to db
          const image  = await client.image.create({
            data:{
                //@ts-ignore
                userId: req.userId,
                prompt: parsedData.data.prompt,
                url: "filepath",
                createdAt: new Date(),
            }
          });

          if(image){
            res.status(200).json({
                message: "Image generated successfully",
                url: filepath
              });
          }
          
    }catch (error) {
        console.error('Image generation error:', error);
        res.status(500).json({
            message: "Failed to generate image"
        });
    }

    });


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});