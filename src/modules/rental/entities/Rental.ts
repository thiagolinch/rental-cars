import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import {v4 as uuidV4} from "uuid"
import { User } from "../../accounts/entities/User"
import { Car } from "../../cars/entities/Car"

@Entity("rentals")
class Rental {
 
    @PrimaryColumn()
    id: string

    // @ManyToOne(() => User)
    // @JoinColumn({name: "user_id"})
    // user: User;

    @Column()
    user_id: string

    @ManyToOne(() => Car)
    @JoinColumn({name: "car_id"})
    car: Car;

    @Column()
    car_id: string

    @CreateDateColumn()
    start_date: Date

    @CreateDateColumn()
    end_date: Date

    @CreateDateColumn()
    expect_return_date: Date

    @Column()
    total: Number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Rental }