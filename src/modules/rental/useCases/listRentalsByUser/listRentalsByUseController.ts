import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./listRentalsByUserUseCase";


class ListRentalsByUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id: user_id} = request.user;
        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

        try {
            const rentals = await listRentalsByUserUseCase.execute(user_id)
            return response.status(200).json({rentals})
        } catch (error) {
            return response.status(404).json({error})
        }
    }
}

export { ListRentalsByUserController }