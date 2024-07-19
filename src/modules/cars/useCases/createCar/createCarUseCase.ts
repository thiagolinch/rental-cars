import { inject, injectable } from "tsyringe";

import { Car } from "../../entities/Car";
import { ICarRepository, ICarRepositoryDTO } from "../../repositories/ICarRepository";
import { ICarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarRepository
    ){}

    async execute({    
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
    }: ICarRepositoryDTO): Promise<Car> {
            const carExists = await this.carsRepository.findByLicensePlate(license_plate)

            if(carExists) {
                throw new Error("This car already exists")
            }

            const car = await this.carsRepository.create({
                name,
                description,
                daily_rate,
                license_plate,
                fine_amount,
                brand,
                category_id
            })

            return car;
        }
}

export { CreateCarUseCase }