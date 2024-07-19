import { Request, Response } from "express";
import { container } from "tsyringe";
import {ListCategoriesUseCase} from "./listCategoriesUseCase";


class ListCategoriesController {
    /* constructor(private listCategoriesUseCase: ListCategoriesUseCase) {} */

    async handle(request: Request, response: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

        const categoriesList = await listCategoriesUseCase.execute();
        
        return response.json(categoriesList)
    }
}

export { ListCategoriesController }