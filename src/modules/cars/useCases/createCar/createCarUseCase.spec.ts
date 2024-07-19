import { ICarRepository } from "../../repositories/ICarRepository"
import { ICarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory"
import { CreateCarUseCase } from "./createCarUseCase"


describe("Create Car Tests", () => {

    let carsRepository: ICarRepositoryInMemory
    let createCarUseCase: CreateCarUseCase

    beforeAll(() => {
        carsRepository = new ICarRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepository)
    })

    test("should be able to create a new car", async () => {
        const car = {
            name: "Honda Civic",
            description: "Carro de luxo",
            daily_rate: 6,
            license_plate: "hti 7727",
            fine_amount: 60,
            brand: "Honda",
            category_id: "7ee165sfa0s19qde518rw9e47ee5qwr5"
        }

        await createCarUseCase.execute({
            name: car.name,
            description: car.description,
            daily_rate: car.daily_rate,
            license_plate: car.license_plate,
            fine_amount: car.fine_amount,
            brand: car.brand,
            category_id: car.category_id
        })

        const carExists = await carsRepository.findByName("Honda Civic")

        expect(carExists).toHaveProperty("id")
    })

    test("a car should be created as available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Honda Civi",
            description: "Carro de luxo",
            daily_rate: 6,
            license_plate: "HTI 7722",
            fine_amount: 60,
            brand: "Honda",
            category_id: "7ee165sfa0s19qde518rw9e47ee5qwr5"
        })

        expect(car.available).toBe(true)
    })

    test("should not be able to create a existent car", async () => {
        const car = {
            name: "Honda Civic",
            description: "Carro de luxo",
            daily_rate: 6,
            license_plate: "hti 7727",
            fine_amount: 60,
            brand: "Honda",
            category_id: "7ee165sfa0s19qde518rw9e47ee5qwr5"
        }

        await expect(
            createCarUseCase.execute({
                name: car.name,
                description: car.description,
                daily_rate: car.daily_rate,
                license_plate: car.license_plate,
                fine_amount: car.fine_amount,
                brand: car.brand,
                category_id: car.category_id
            })

        ).rejects.toEqual(new Error("This car already exists"))
    })
})