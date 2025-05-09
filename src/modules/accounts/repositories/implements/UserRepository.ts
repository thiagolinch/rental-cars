import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }

    async create({name, email, password, driver_license, isAdmin, id, avatar}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            isAdmin,
            id,
            avatar
        })

        await this.repository.save(user)
    }

    async listUsers(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({id})
        return user;
    }

}

export { UserRepository }