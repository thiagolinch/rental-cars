import { inject, injectable } from "tsyringe";

import { Car } from "../../entities/Car";

import { ICarRepository } from "../../repositories/ICarRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    car_id: string;
    specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarRepository,
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ){}

    async execute({car_id, specification_id}: IRequest): Promise<Car> {

        const carExists = await this.carsRepository.findById(car_id)
    
        if(!carExists) {
            throw new Error("This car does not exists")
        }

        const specifications = await this.specificationRepository.findByIds(specification_id)

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists)

        return carExists;
    }
}

export { CreateCarSpecificationUseCase }