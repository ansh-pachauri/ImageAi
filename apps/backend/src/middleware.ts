import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "secret";

export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";
    
    const decoded = jwt.verify(token, JWT_SECRET);
    if(decoded){
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }
    else{
        res.status(401).json({"message" : "Unauthorized"});
    }
}