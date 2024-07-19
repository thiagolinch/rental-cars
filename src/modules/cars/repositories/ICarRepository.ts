import { Car } from "../entities/Car";
import { Specification } from "../entities/Specification";

interface ICarRepositoryDTO {
    id?: string;
    name: string;
    description: string;
    daily_rate: number;
    available?: boolean;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
}

interface ICarRepository {
    create(data: ICarRepositoryDTO): Promise<Car>;
    findById(car_id: string): Promise<Car>;
    findByName(name: string): Promise<Car>;
    findAvailabe(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarRepository, ICarRepositoryDTO  }