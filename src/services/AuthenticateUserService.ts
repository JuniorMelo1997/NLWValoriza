import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface AuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({email, password} : AuthenticateRequest){

        const userRepositories = getCustomRepository(UsersRepositories);

        const userExists = await userRepositories.findOne({email});

        console.log(userExists);

        if(!userExists){
            throw new Error("email/password incorrect");
        }
        

        const passwordMatch = await compare(password, userExists.password);

        

        if(!passwordMatch){
            throw new Error("email/password incorrect");
        }

        

        const token = sign(
            {email: userExists.email},
            "ca79f441a83127c2ee30813f564770db",
            {
                subject: userExists.id,
                expiresIn: "1d"
            }    
        )

        return token;

    }
}

export {AuthenticateUserService}