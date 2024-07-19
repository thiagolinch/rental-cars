import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoryRepositoryInMemory"
import { CreateCategoryUseCase } from "./createCategoriesUseCase"

describe("Create Category", () => {
    let categoryRepositoryInMemory: CategoriesRepositoryInMemory;
    let createCategoriesUseCase: CreateCategoryUseCase;

    beforeAll(() => {
        categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoriesUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory)
    })

    it("should be able to create a category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test"
        }

        await createCategoriesUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoryRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id")
    })

    it("should not be able to create a category existent", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test"
        }
        
        await expect(createCategoriesUseCase.execute({
            name: category.name,
            description: category.description
        })).rejects.toEqual(new Error("Category already exists!"))
    })
})