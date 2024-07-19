import { inject, injectable } from "tsyringe"
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider"
import { User } from "../../entities/User"
import { IUserRepository } from "../../repositories/IUserRepository"

@injectable()
class UserProfileUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){};

    async execute(user_id: string): Promise<User> {
        const user = await this.userRepository.findById(user_id)
        return user
    }

}

export { UserProfileUseCase }