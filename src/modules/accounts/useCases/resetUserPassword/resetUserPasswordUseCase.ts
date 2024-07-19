import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetUserPasswordUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRep: IUsersTokensRepository,
        @inject("DaysJSDateProvider")
        private dayJsProvider: IDateProvider,
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute({token, password}: IRequest): Promise<void> {
        const userToken = await this.usersTokenRep.findByUserRefreshToken(token)

        if(!userToken) {
            throw new Error("Token Invalid")
        }

        if(this.dayJsProvider.compareIfBefore(userToken.expires_date, this.dayJsProvider.dateNow())) {
            throw new Error("Token expired!")
        }

        const user = await this.userRepository.findById(userToken.user_id)

       user.password = await hash(password, 9);

        await this.userRepository.create(user);

        await this.usersTokenRep.deleteById(userToken.id)
    }
}

export { ResetUserPasswordUseCase } 