import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";


class CreateCarSpecificationsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const { specification_id } = request.body;
        const createCarSpecificationsUseCase = container.resolve(CreateCarSpecificationUseCase)

        try {
            const specificationsCar = await createCarSpecificationsUseCase.execute({car_id: id, specification_id })
            return response.status(200).json(specificationsCar)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}

export { CreateCarSpecificationsController }