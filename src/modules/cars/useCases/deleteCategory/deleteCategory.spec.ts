import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoryRepositoryInMemory"
import { CreateCategoryUseCase } from "../createCategory/createCategoriesUseCase"
import { DeleteCategoryUseCase } from "./deleteCategoryUseCase"


describe("Delete Category", () => {
    let categoryRepository: CategoriesRepositoryInMemory
    let createCategoryUseCase: CreateCategoryUseCase
    let deleteCategoryUseCase: DeleteCategoryUseCase

    beforeEach( () => {
        categoryRepository = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
        deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)
    })

    test("should be able to delete a category", async () => {
        const category = {
            name: "Category test",
            description: "Description test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryExists = await categoryRepository.findByName(category.name)

        await deleteCategoryUseCase.execute(categoryExists.id)

        const all = await categoryRepository.list()

        expect(all).toHaveLength(0)
    })

    /* test("should not be able to delete anonexistent category", async () => {

        expect(async () => {
            const category = {
                id: "0d73b2b5-b868-444d-af0e-c3733e1c3c7f",
                name: "Category test",
                description: "Description test"
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })

            await deleteCategoryUseCase.execute("0d73b2b5-b868-444d-af0e-c3733e1c3c8f")
            
        }).rejects.toEqual(Error)
    }) */
})