import { ICarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase"

let carsRepositoryInMemory: ICarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

beforeEach(() => {
    carsRepositoryInMemory = new ICarRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
})


describe("Create Car Specification", () =>  {

    it("should be able to add a new specificaton to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Honda Civic",
            description: "Carro de luxo",
            daily_rate: 6,
            license_plate: "hti 7727",
            fine_amount: 60,
            brand: "Honda",
            category_id: "7ee165sfa0s19qde518rw9e47ee5qwr5"
        });

        const specification1 = await specificationRepositoryInMemory.create({
            name: "Automatic",
            description: "Automatic car"
        })

        const specification2 = await specificationRepositoryInMemory.create({
            name: "Flex",
            description: "Flex car"
        })

        const car_id = car.id;
        const specification_id = [specification1.id, specification2.id];

        const specificationCar = await createCarSpecificationUseCase.execute({car_id, specification_id});
        
        expect(specificationCar).toHaveProperty("specifications")
        expect(specificationCar.specifications.length).toBe(2)
    })

    it("should not be able to add a new specificaton to a nonexistent car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Honda Civic",
            description: "Carro de luxo",
            daily_rate: 6,
            license_plate: "hti 7727",
            fine_amount: 60,
            brand: "Honda",
            category_id: "7ee165sfa0s19qde518rw9e47ee5qwr5"
        });
        const car_id = "1234"
        const specification_id = ["54321"];

        await expect(createCarSpecificationUseCase.execute({car_id, specification_id})
        ).rejects.toEqual(new Error("This car does not exists"))
    })
})