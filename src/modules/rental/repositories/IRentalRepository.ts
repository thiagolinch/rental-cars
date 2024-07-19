

import { Rental } from "../entities/Rental";

interface IRentalRepositorDTO {
    user_id: string;
    car_id: string;
    id?: string;
    end_date?: Date;
    total?: Number;
    expect_return_date: Date;
}


interface IRentalRepository {
    create({user_id, car_id, expect_return_date}: IRentalRepositorDTO): Promise<Rental>;
    listRentals(): Promise<Rental[]>;
    findById(id: string): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUse(user_id: string): Promise<Rental>;
    listRentalsByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalRepository, IRentalRepositorDTO }