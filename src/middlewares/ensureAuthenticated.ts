import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try{
        const { sub } = verify(token, "ca79f441a83127c2ee30813f564770db") as PayLoad;
        req.user_id = sub;
    }catch{
        return res.status(401).end();
    }

    return next();
}