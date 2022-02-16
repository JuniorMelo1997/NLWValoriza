import {Router} from "express";
import { CreateTagsController } from "./Controllers/CreateTagControllers";
import { CreateUsersController } from "./Controllers/CreateUserControllers";
import {ensureAdmin} from "./middlewares/ensureAdmin"

const router = Router();
const createUserController = new CreateUsersController();
const createTagsController = new CreateTagsController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin, createTagsController.handle);


export {router}