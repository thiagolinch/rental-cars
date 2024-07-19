/* import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryUseCase } from "./createCategoriesUseCase";
import { CreateCategoryController } from "./createCategoryController";

export default (): CreateCategoryController => {
    const categoryRepository = new CategoriesRepository()

    const createCategoriesUseCase = new CreateCategoryUseCase(categoryRepository);

    const createCategoryController = new CreateCategoryController(createCategoriesUseCase)


    return createCategoryController
} */