import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoryRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];


    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name)
        return category
    }
    async findById(id: string): Promise<Category> {
        const category = this.categories.find((category) => category.id === id)
        return category
    }
    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category)
    }
    async delete(id: string): Promise<void> {
        this.categories.splice(this.categories.findIndex(v => v.id === id), 1);
    }
} export { CategoriesRepositoryInMemory }