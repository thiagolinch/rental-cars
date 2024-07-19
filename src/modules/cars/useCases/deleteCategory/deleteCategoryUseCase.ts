import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoryRepository";


@injectable()
class DeleteCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private caetegoriesRepository: ICategoriesRepository
    ){}

    async execute(id: string): Promise<void> {
        const categoryExistst = this.caetegoriesRepository.findById(id)

        if(!categoryExistst){
            throw new Error("Category does not exists")
        }

        await this.caetegoriesRepository.delete(id)
    }
} export { DeleteCategoryUseCase }