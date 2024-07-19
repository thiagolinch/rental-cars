import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { ICarRepository } from "../../../cars/repositories/ICarRepository";
import { IRentalRepository } from "../../repositories/IRentalRepository";

import { Rental } from "../../entities/Rental";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalRepository: IRentalRepository,
        @inject("DaysJSDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarRepository,

    ) {}

    async execute({id}: IRequest): Promise<Rental> {
        const rental = await this.rentalRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id)
        const minumum_daily = 1;

        if(!rental) {
            throw new Error("This rental does not exists")
        }

        const dateNow = this.dateProvider.dateNow()

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        )

        if(daily <= 0 ) {
            daily = minumum_daily;
        }

        const delay = this.dateProvider.compareInHours(
            dateNow,
            rental.expect_return_date
        )

        let total = 0

        if(delay > 0) {
            const calulate_fine = delay * car.fine_amount;
            total = calulate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total  = total;
        
        await this.rentalRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true)

        return rental;
    }
}

export { DevolutionRentalUseCase }