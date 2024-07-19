import { Request, Response } from "express";
import { container, inject } from "tsyringe";
import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";
import { ListRentalsUseCase } from "./listrentalsUseCase";


class ListRentalsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listRentalsUseCase = container.resolve(ListRentalsUseCase)

        try {
            const rentals = await listRentalsUseCase.execute();
            return response.status(201).json({rentals})
        } catch (error) {
            return response.status(404).json({error})
        }
    }
}

export { ListRentalsController }