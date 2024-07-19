import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportSpecificationUseCase } from "./importSpecificationUseCase";


class ImportSpecificationController {
   
    async handle(request: Request, response: Response): Promise<Response> {
        const {file } = request;

        const specificationUseCase = container.resolve(ImportSpecificationUseCase)

        specificationUseCase.execute(file)

        return response.status(200).send()
    }
}

export { ImportSpecificationController }