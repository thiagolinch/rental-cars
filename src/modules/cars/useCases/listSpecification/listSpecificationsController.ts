import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./listSpecificationsUseCase";


class ListSpecificationsController {
    /* constructor( private listSpecificationUseCase: ListSpecificationsUseCase) {} */

    async handle(request: Request, response: Response): Promise<Response> {

        const listSpecificationUseCase = container.resolve(ListSpecificationsUseCase)

        const specificationList = await listSpecificationUseCase.execute()
        
        return response.json(specificationList)
    }
}

export { ListSpecificationsController }