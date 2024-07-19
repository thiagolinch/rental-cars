import { getRepository, Repository } from "typeorm";
import { Car } from "../../entities/Car";
import { ICarRepository, ICarRepositoryDTO } from "../ICarRepository";


class CarsRepository implements ICarRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({
        id,
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications
    }: ICarRepositoryDTO): Promise<Car> {
        const car = this.repository.create({
            id,
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications
        })

        await this.repository.save(car)

        return car;
        
    }

    findById(car_id: string): Promise<Car> {
        return this.repository.findOne({id: car_id})
    }

    findByName(name: string): Promise<Car> {
        return this.repository.findOne({name}, {relations: ["category"]});
    }

    findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({license_plate}, {relations: ["category"]});
    }

    async findAvailabe(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder("c").where("c.available = :available", {available: true})

        if(brand) {
            carsQuery.andWhere("c.brand = :brand", { brand })
        }

        if(name) {
            carsQuery.andWhere("c.name = :name", { name })
        }

        if(category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })
        }

        const cars = await carsQuery.getMany();

        return cars;
    }


    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({available})
        .where("id = :id")
        .setParameters({id})
        .execute();
    }

}

export { CarsRepository }