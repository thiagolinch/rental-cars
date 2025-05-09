import { AdvancedConsoleLogger } from "typeorm";
import { Car } from "../../entities/Car";
import { ICarRepository, ICarRepositoryDTO } from "../ICarRepository";


class ICarRepositoryInMemory implements ICarRepository {
    cars: Car[] = [];

    async create({    
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id}: ICarRepositoryDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        this.cars.push(car)

        return car;
    }

    async findById(car_id: string): Promise<Car> {
        return this.cars.find((car) => car.id === car_id)
    }

    async findByName(name: string): Promise<Car> {
        return this.cars.find((car) => car.name === name)
    }

    async findAvailabe(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const all =  this.cars.filter((car) => {
            if(
                car.available === true ||
                (brand && car.brand === brand) || 
                (category_id && car.category_id === category_id) || 
                (name && car.name === name)
            ) {
                return car;
            }

            return null;
        });
        
        return all
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate)
    }

    async list(): Promise<Car[]> {
        return this.cars;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car => car.id === id)
        this.cars[findIndex].available = available;
    }
}

export { ICarRepositoryInMemory }