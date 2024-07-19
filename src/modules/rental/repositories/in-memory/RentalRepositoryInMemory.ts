
import { Rental } from "../../entities/Rental";
import { IRentalRepositorDTO, IRentalRepository } from "../IRentalRepository";


class RentalRepositoryInMemory implements IRentalRepository {

    rentals: Rental[] = [];

    async create({ user_id, car_id, expect_return_date }: IRentalRepositorDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            user_id,
            car_id,
            start_date: new Date(),
            expect_return_date
        })

        this.rentals.push(rental)

        return rental;
    }


    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date)
    }
    
    async findOpenRentalByUse(user_id: any): Promise<Rental> {
        return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date)
    }

    async listRentals(): Promise<Rental[]> {
        throw new Error("Method not implemented.");
    }
    
    async findById(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id = id)
    }
    
    async listRentalsByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter(rental => rental.user_id = user_id)
    }
}

export { RentalRepositoryInMemory }