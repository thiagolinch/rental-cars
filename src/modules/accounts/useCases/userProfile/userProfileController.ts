import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserProfileUseCase } from "./userProfileUseCase";

class UserProfileController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const userProfileUC = container.resolve(UserProfileUseCase)

        try {
            const user = await userProfileUC.execute(id)

            return response.status(200).json(user)
        } catch (error) {
            return response.status(400).json({
                error: error.message || "Unexpected error"
            });
        }
    }
}

export { UserProfileController }