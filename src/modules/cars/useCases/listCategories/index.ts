import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./listCategoriesController";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";

/* export default(): ListCategoriesController => {
    // Como estou usando o singleto privatizando o constructo eu posso apenas chamar o method
    // getInstance que tras consigo os dados do repositorio se tiver ou permite criar uma
    // nova instancia caso nao exista. FAZER ISSO EM TODOS OS LUGARES QUE USEM ESSE REPOSITORY
    const categoryRepository = new CategoriesRepository()

    const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository)

    const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

    return listCategoriesController
} */