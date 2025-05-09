import { Router } from "express";
import { AuthenticateUserController } from "../../../modules/accounts/useCases/authenticateUser/authenticateUserCotroller";
import { RefreshTokenController } from "../../../modules/accounts/useCases/refreshToken/refreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController= new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)

export { authenticateRoutes }