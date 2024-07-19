import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";

import { Car } from "./Car";


@Entity("cars_image") //cars_image
class CarImage {

    @PrimaryColumn()
    id: string;

    @Column()
    image_name: string;

    @Column()
    car_id: string;

    @ManyToOne(() => Car)
    @JoinColumn({name: "car_id"})
    car: Car


    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4()
        }
    }
}

export { CarImage }