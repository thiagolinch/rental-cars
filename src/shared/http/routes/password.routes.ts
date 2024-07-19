import { Router } from "express"
import { ResetUserPasswordController } from "../../../modules/accounts/useCases/resetUserPassword/resetUserPasswordController";
import { SendForgotPasswordEmailController } from "../../../modules/accounts/useCases/sendForgotPasswordEmail/sendForgotPasswordEmailController";

const passwordRoutes = Router();

const sendForgotPasswordEmailContoller = new SendForgotPasswordEmailController();
const resetPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailContoller.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export { passwordRoutes }