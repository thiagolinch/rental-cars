import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./deleteCategoryUseCase";


class DeleteCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteUseCase = container.resolve(DeleteCategoryUseCase)

        await deleteUseCase.execute(id)
        return response.status(200).send()
    }
} export { DeleteCategoryController }