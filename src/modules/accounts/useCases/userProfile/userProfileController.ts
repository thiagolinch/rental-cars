import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserProfileUseCase } from "./userProfileUseCase";

class UserProfileController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const userProfileUC = container.resolve(UserProfileUseCase)

        const user = await userProfileUC.execute(id)
        console.log(user)

        return response.status(200).json(user)
    }
}

export { UserProfileController }