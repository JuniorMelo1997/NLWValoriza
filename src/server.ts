import "reflect-metadata";
import express, { Request, Response, NextFunction, response } from "express";
import "express-async-errors";
import "./database/index";
import {router} from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, rese: Response, next: NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({error: err.message})
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})


app.listen(3000, ()=>{
    console.log("Running on");
})