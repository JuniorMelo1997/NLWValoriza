import {Router} from "express";
import { CreateUsersController } from "./Controllers/CreateUserControllers";

const router = Router();
const createUserController = new CreateUsersController();

router.post("/users", createUserController.handle);


export {router}