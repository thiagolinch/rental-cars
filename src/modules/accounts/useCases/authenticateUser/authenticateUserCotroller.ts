import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";


class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

        try {
            const token = await  authenticateUserUseCase.execute({email, password})
            return response.status(200).json(token)
        } catch (error) {
            return response.status(400).json({
                error: error.message || "Unexpected error"
            });
        }
    }
}

export { AuthenticateUserController }