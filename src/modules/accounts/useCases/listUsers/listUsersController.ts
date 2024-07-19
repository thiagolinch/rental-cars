import { Request, Response } from "express";
import { resolveConfig } from "prettier";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./listUsersUseCase";


class ListUsersController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listUsersUseCase = container.resolve(ListUsersUseCase);

        try {
            const usersList = await listUsersUseCase.execute()
            return response.status(201).json({usersList})
        } catch (error) {
            return response.status(404).json({error})
        }
    }
}

export { ListUsersController }