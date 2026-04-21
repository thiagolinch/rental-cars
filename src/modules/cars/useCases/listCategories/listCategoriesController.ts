import { Request, Response } from "express";
import { container } from "tsyringe";
import {ListCategoriesUseCase} from "./listCategoriesUseCase";


class ListCategoriesController {
    /* constructor(private listCategoriesUseCase: ListCategoriesUseCase) {} */

    async handle(request: Request, response: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

        try {
            const categoriesList = await listCategoriesUseCase.execute();
        
            return response.json(categoriesList)
        } catch (error) {
            return response.status(400).json({
                error: error.message || "Unexpected error"
            });
        }
    }
}

export { ListCategoriesController }