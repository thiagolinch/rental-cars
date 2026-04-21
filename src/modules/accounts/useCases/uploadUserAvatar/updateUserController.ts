import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./uploadUserAvatarUseCase";


class UpdateUserAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
        const avatarFile = request.file.filename;

        try {
            await updateUserAvatarUseCase.execute({user_id: id, avatarFile})

            return response.status(204).send()
        } catch (error) {
            return response.status(400).json({
            error: error.message || "Unexpected error"
            });
        }
    }
}

export { UpdateUserAvatarController }