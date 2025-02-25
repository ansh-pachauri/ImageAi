import express from "express";
import {client} from "@repo/db/client";
import {z} from "zod";
import jwt from "jsonwebtoken";
import {middleware} from "./middleware";
import OpenAI from "openai";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const JWT_SECRET = "secret";

const app = express();
app.use(express.json());

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
        res.status(411).json({"message" : "User already exists"});
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

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024"
    });
    if (response.data && response.data[0]) {
        console.log(response.data[0].url);
    } else {
        res.status(500).json({"message" : "Failed to generate image"});
    }
    // const imageUrl = response.data[0].url;
    // try{
    //     const image = await client.image.create({
    //         data:{
    //             url : imageUrl,
    //             userId : req.userId
    //         }
    //     })
    //     res.json({imageUrl : image.url});
    // }catch(e){
    //     res.status(401).json({"message" : "Invalid Credentials"});  
    });


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});