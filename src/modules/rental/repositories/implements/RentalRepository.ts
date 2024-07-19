import { getRepository, Repository } from "typeorm";


import { Rental } from "../../entities/Rental";
import { IRentalRepositorDTO, IRentalRepository } from "../IRentalRepository";


class RentalRepository implements IRentalRepository {
    private repository: Repository<Rental>

    constructor(){
        this.repository = getRepository(Rental)
    }

    async create({ user_id, car_id, expect_return_date, id, end_date, total }: IRentalRepositorDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expect_return_date,
            id,
            end_date,
            total
        })

        await this.repository.save(rental)

        return rental;
    }

    async listRentals(): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: {end_date: null}
        });
        return rentals;
    }

    async listRentalsByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: {user_id},
            relations: ["car"]
        })
        return rentals;
    }

    async findById(id: string): Promise<Rental> {
        return await this.repository.findOne({id})
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: {car_id, end_date: null}
        })
    }

    async findOpenRentalByUse(user_id: any): Promise<Rental> {
        return await this.repository.findOne({
            where: {user_id, end_date: null}
        })
    }

}

export { RentalRepository }