import {Request, Response} from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUsersController{

    async handle(request: Request, response: Response){
        const { name, email, password, admin } = request.body;

        const createUserService = new CreateUserService;

        const user = createUserService.execute({name, email, password, admin});

        return response.json(user);
    }
};

export {CreateUsersController};