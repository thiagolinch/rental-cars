import { inject, injectable } from "tsyringe";
import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";

@injectable()
class ListRentalsUseCase {

    constructor(
        @inject("RentalRepository")
        private rentalRepository: IRentalRepository
    ) {}

    async execute(): Promise<Rental[]> {
        const rentals = await this.rentalRepository.listRentals();
        return rentals;
    }
}

export { ListRentalsUseCase }