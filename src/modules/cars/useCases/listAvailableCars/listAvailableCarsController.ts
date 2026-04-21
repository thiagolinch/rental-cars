import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";


class ListAvailableCarsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {brand, name, category_id} = request.query;
        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

        try {
            const cars  = await listAvailableCarsUseCase.execute({
                brand: brand as string,
                name: name as string,
                category_id: category_id as string
            });

            return response.json(cars)
        } catch (error) {
            return response.status(400).json({
                error: error.message || "Unexpected error"
            });
        }
    }
}

export { ListAvailableCarsController }