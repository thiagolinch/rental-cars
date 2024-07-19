import { ICarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory"
import { CreateCarUseCase } from "../createCar/createCarUseCase";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";


describe("Listing all available cars to user", () => {

    let carsRepository: ICarRepositoryInMemory;
    let listAvailableCarsUseCase: ListAvailableCarsUseCase;
    let createCarUseCase: CreateCarUseCase;

    beforeEach(() => {
        carsRepository = new ICarRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
        createCarUseCase = new CreateCarUseCase(carsRepository);
    })

    test("Should be able to show all available cars", async() => {
        const car = await createCarUseCase.execute({
            name: "Car 1",
            description: "Carro de passeio",
            daily_rate: 6,
            license_plate: "hto 1234",
            fine_amount: 60,
            brand: "Brand 1",
            category_id: "category_id 1"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car])
    });

    it("Should be able to list all available cars by name search", async () => {
        const car = await createCarUseCase.execute({
            name: "Car 2",
            description: "Carro de passeio",
            daily_rate: 6,
            license_plate: "hto 1235",
            fine_amount: 60,
            brand: "Brand 2",
            category_id: "category_id 2"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 2"
        });

        expect(cars).toEqual([car])
    });

    it("Should be able to list all available cars by brand search", async () => {
        const car = await createCarUseCase.execute({
            name: "Car 3",
            description: "Carro de passeio",
            daily_rate: 6,
            license_plate: "hto 1236",
            fine_amount: 60,
            brand: "Brand 2",
            category_id: "category_id 3"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Brand 2"
        });

        expect(cars).toEqual([car])
    })
})