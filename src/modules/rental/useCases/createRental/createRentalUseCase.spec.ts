import dayjs from "dayjs";
import { DaysJSDateProvider } from "../../../../shared/container/providers/DateProvider/implemantations/DayJsDateProvider";

import { ICarRepositoryInMemory } from "../../../cars/repositories/in-memory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let carRepository: ICarRepositoryInMemory;
let dateProviderDayJS: DaysJSDateProvider;

describe("Create rental", () => {
    const dayAdd24Hours = dayjs().add(2, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalRepositoryInMemory();
        dateProviderDayJS = new DaysJSDateProvider();
        carRepository = new ICarRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dateProviderDayJS, carRepository);
    })

    it("Should be ablet o create a rental", async () => {
        const car = await carRepository.create({
            name: "Honda Civic",
            description: "Carro sport",
            daily_rate: 10,
            license_plate: "hto 1234",
            fine_amount: 100,
            brand: "Honda",
            category_id: "6c9c6c40-5397-4190-a7e5-6a40d622b359"
        })

        const rental = await createRentalUseCase.execute({
            user_id: "23456",
            car_id: car.id,
            expect_return_date: dayAdd24Hours
        })

        const carAvailable = await carRepository.findById(car.id)

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
        expect(carAvailable.available).toEqual(false)
    });

    it("User should not be able to make more then one rental per time", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "23456",
            car_id: "2222",
            expect_return_date: dayAdd24Hours
        })

        await expect(createRentalUseCase.execute({
                user_id: "23456",
                car_id: "2223",
                expect_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new Error("You can't take two cars in the same time"))
    });

    it("Should not be able to have two active rental to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "2222",
            car_id: "2222",
            expect_return_date: dayAdd24Hours
        })

        await expect(createRentalUseCase.execute({
                user_id: "212121",
                car_id: "2222",
                expect_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new Error("Car is unavailable"))
    });

    it("Should not be able to create a rental with least than 24 hours of duration", async () => {
        await expect(createRentalUseCase.execute({
                user_id: "2222",
                car_id: "2222",
                expect_return_date: new Date()
            })
        ).rejects.toEqual(new Error("Rental must be at least 24 hours"))
    })
})