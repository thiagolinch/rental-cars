import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoryRepository";


/**SINGLETON - objetivo, não permitir outras classes terem acesso ao constructor
 * dessa maneira apenas a propria classe podera instanciar um novo repository ou
 * disponibilizar o conteudo deste repository se ja existente.
 */


class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>
	
	constructor() {
		this.repository = getRepository(Category);  
	}
	
	// Posso copiar o que eu criei de code dentro da rota para create
	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		
        const category = this.repository.create({
            name,
            description
        })

        await this.repository.save(category)
	}

    async delete(id:string): Promise<void> {
        await this.repository.delete({id})
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findById(id: string): Promise<Category> {
        const category = await this.repository.findOne({id})
        return category;
    }

    findByName(name: string): Promise<Category> {
        // SELECT * FROM categories WHERE name = "name"
        // neste caso a parte do WHERE esta sendo representado pelas {} no findOne.
        const category = this.repository.findOne({name})
        return category
    }
}

export { CategoriesRepository }