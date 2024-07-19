import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/implements/UserRepository";
import { IUserRepository } from "../../repositories/IUserRepository";


@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {};

    async execute(): Promise<User[]> {
        const users = await this.userRepository.listUsers();
        return users;
    }
}

export { ListUsersUseCase }