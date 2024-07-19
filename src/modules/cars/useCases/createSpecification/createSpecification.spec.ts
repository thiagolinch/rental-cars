import { Specification } from "../../entities/Specification"
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateSpecificationUseCase } from "./createSpecificationUseCase";


describe("Create Specification", () => {
    let specificationRepository: SpecificationRepositoryInMemory;
    let createSpecificationUseCase: CreateSpecificationUseCase

    beforeAll(() => {
        specificationRepository = new SpecificationRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)
    })

    test("should be able to create an specification", async () => {
        const specification = {
            name: "Specification Test",
            description: "Specification created to test"
        }

        await createSpecificationUseCase.execute({
            name: specification.name,
            description: specification.description
        })

        const specificationCreated = await specificationRepository.findByName(specification.name) 

        expect(specificationCreated).toHaveProperty("id")
    })

    test("should not be able to create an existent specification", async () => {
        const specification = {
            name: "Specification Test",
            description: "Specification created to test"
        }
        
        await expect(createSpecificationUseCase.execute({
                name: specification.name,
                description: specification.description
            })

        ).rejects.toEqual(new Error("Specification already exists!"))
    })
})