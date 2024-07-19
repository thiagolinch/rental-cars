import { inject, injectable } from "tsyringe";

import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";


@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalRepository: IRentalRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentals = await this.rentalRepository.listRentalsByUser(user_id)

        return rentals;
    }
}

export { ListRentalsByUserUseCase }