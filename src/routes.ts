import {Router} from "express";
import { AuthenticateUserController } from "./Controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./Controllers/CreateComplimentController";
import { CreateTagsController } from "./Controllers/CreateTagControllers";
import { CreateUsersController } from "./Controllers/CreateUserControllers";
import { ListTagsController } from "./Controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./Controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./Controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./Controllers/ListUserSendComplimentsController";
import {ensureAdmin} from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();
const createUserController = new CreateUsersController();
const createTagsController = new CreateTagsController();
const createComplimentsController = new CreateComplimentsController();
const createAuthenticateUserController = new AuthenticateUserController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post("/login", createAuthenticateUserController.handle);
router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagsController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentsController.handle);
router.get("/compliments/sended", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/compliments/received", ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get("/tagslist", ensureAuthenticated, listTagsController.handle);
router.get("/users/list", ensureAuthenticated, ensureAdmin, listUsersController.handle);


export {router}