import { inject, injectable } from "tsyringe";
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";

import { Rental } from "../../entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { ICarRepository } from "../../../cars/repositories/ICarRepository";

dayjs.extend(utc)

interface IRequest {
    user_id: string;
    car_id: string;
    expect_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalRepository: IRentalRepository,
        @inject("DaysJSDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carRepository: ICarRepository
    ) {}

    async execute({user_id, car_id, expect_return_date}: IRequest): Promise<Rental> {
        const minimalHours = 24;

        // Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo carro
        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

        if(carUnavailable) {
            throw new Error("Car is unavailable")
        }

        // Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel aberto para o mesmo usuário
        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUse(user_id)

        if (rentalOpenToUser) {
            throw new Error("You can't take two cars in the same time")
        }

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(dateNow, expect_return_date)
        
        if(compare < minimalHours) {
            throw new Error("Rental must be at least 24 hours")
        }

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expect_return_date
        });

        await this.carRepository.updateAvailable(car_id, false)

        return rental;
    }
}

export { CreateRentalUseCase }