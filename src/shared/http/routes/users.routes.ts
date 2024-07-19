import { Router } from "express";
import multer from "multer";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateUserController } from "../../../modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../../../modules/accounts/useCases/uploadUserAvatar/updateUserController";

import uploadConfig from "../../../config/upload"
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListUsersController } from "../../../modules/accounts/useCases/listUsers/listUsersController";
import { UserProfileController } from "../../../modules/accounts/useCases/userProfile/userProfileController";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const userProfileController = new UserProfileController()
const updateUserAvatarContoller = new UpdateUserAvatarController()

userRoutes.post("/", createUserController.handle)
userRoutes.get("/", ensureAuthenticate, ensureAdmin, listUsersController.handle)
userRoutes.patch("/avatar",uploadAvatar.single("avatar"), ensureAuthenticate, updateUserAvatarContoller.handle)
userRoutes.get("/profile", ensureAuthenticate, userProfileController.handle)

export { userRoutes }