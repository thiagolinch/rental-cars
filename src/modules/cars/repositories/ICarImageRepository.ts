import { CarImage } from "../entities/CarImage";


interface ICarImageRepository {
    create(image_name: string, car_id: string): Promise<CarImage>;
}

export { ICarImageRepository }