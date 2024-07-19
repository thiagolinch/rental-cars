import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./createCategoriesUseCase";

class CreateCategoryController {

    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        const createCategoriesUseCase = container.resolve(CreateCategoryUseCase)

        try {
            await createCategoriesUseCase.execute({description, name})
            return response.status(201).send()
        } catch (error) {
            return response.status(400).send(error)
        }
    }
}

export { CreateCategoryController }