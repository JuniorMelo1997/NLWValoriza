import {Request, Response, NextFunction} from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";




export async function ensureAdmin(req: Request, res: Response, next: NextFunction){
    const user_id = req.user_id;

    const userRepositories = getCustomRepository(UsersRepositories);

    const user = await userRepositories.findOne(user_id);
    const admin = user?.admin;

    res.json(admin);

    if(admin){
        return next()
    }

    return res.status(401).json({
        error: "Unauthorized"
    })
}