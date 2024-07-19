import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {};

    async execute({name, email, password, driver_license, isAdmin}: ICreateUserDTO): Promise<void> {
        const userExists = await this.userRepository.findByEmail(email)

        if(userExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8);

        await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
            isAdmin
        })
    }
}

export { CreateUserUseCase }