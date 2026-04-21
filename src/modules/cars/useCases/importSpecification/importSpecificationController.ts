import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportSpecificationUseCase } from "./importSpecificationUseCase";


class ImportSpecificationController {
   
    async handle(request: Request, response: Response): Promise<Response> {
        const {file } = request;

        const specificationUseCase = container.resolve(ImportSpecificationUseCase)

        try {
            await specificationUseCase.execute(file)

            return response.status(200).send()
        } catch (error) {
            return response.status(400).json({
                error: error.message || "Unexpected error"
            });
        }
    }
}

export { ImportSpecificationController }