import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ){}

    async execute({description, name}: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new Error("Category already exists!")
        }
    
        // Para usar o repositorio basta chama-lo depois de instanciar e definir qual o method dele que irei usar.
        // neste caso vou usar o create, agora so passar os dados a serem enviados e dar um return.
        // Aqui mesmo ja faz todo o envio e validação necessária, trazendo apenas a informação se deu certo ou não.
        this.categoriesRepository.create({name, description})
    };
};

export {CreateCategoryUseCase}