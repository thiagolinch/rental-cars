import { inject, injectable } from "tsyringe";
import { S3StorageProvider } from "../../../../shared/container/providers/StorageProvider/Implements/S3StorageProvider";

import { ICarImageRepository } from "../../repositories/ICarImageRepository";
import { ICarRepository } from "../../repositories/ICarRepository";

interface IRequest {
    car_id: string;
    image_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarRepository,

        @inject("CarImageRepository")
        private carImageRepository: ICarImageRepository,

        @inject("StorageProvider")
        private storageProvider: S3StorageProvider
    ){}

    async execute({image_name, car_id}: IRequest): Promise<void> {
        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists) {
            throw new Error("This car does not exists")
        }

        image_name.map(async (image) => {
            await this.carImageRepository.create(
                image,
                car_id
            );
            await this.storageProvider.save(image, "cars")
        })
    }

}

export { UploadCarImageUseCase }