import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./deleteCategoryUseCase";


class DeleteCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteUseCase = container.resolve(DeleteCategoryUseCase)

        try {
            await deleteUseCase.execute(id)
            return response.status(200).send()
        } catch (error) {
            return response.status(400).json({
                error: error.message || "Unexpected error"
            });
        }
    }
} export { DeleteCategoryController }