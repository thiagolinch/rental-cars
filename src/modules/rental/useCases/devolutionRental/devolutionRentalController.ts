import { Request, Response } from "express";
import { container } from "tsyringe";
import { CustomRepositoryCannotInheritRepositoryError } from "typeorm";
import { DevolutionRentalUseCase } from "./devolutionRentalUseCase";


class DevolutionRentalController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id: user_id} = request.user;
        const {id} = request.params;

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

        try {
            const devolution = await devolutionRentalUseCase.execute({id, user_id})
            return response.status(200).json({devolution})
        } catch (error) {
            return response.status(404).json({error})
        }
    }
}

export { DevolutionRentalController }