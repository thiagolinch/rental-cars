import { inject, injectable, injectAll } from "tsyringe";
import { Car } from "../../entities/Car";
import { ICarRepository } from "../../repositories/ICarRepository";

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarRepository
    ){}

    async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailabe(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

export { ListAvailableCarsUseCase }