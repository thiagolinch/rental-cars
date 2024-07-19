import { getRepository, Repository } from "typeorm";
import { CarImage } from "../../entities/CarImage";
import { ICarImageRepository } from "../ICarImageRepository";


class CarImageRepository implements ICarImageRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create( image_name: string, car_id: string): Promise<CarImage> {
        const carImage = this.repository.create({
            image_name,
            car_id
        })

        await this.repository.save(carImage)

        return carImage;
    }

}

export { CarImageRepository }