import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken"

import auth from "../../../../config/auth";

import { IUsersTokensRepository } from "../../repositories/IUsersTokenRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    email: string;
};

interface ITokenResponse {
    token: string;
    refresh_token: string ;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRep: IUsersTokensRepository,
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("DaysJSDateProvider")
        private dateProvider: IDateProvider
    ){}


    async execute(token: string): Promise<ITokenResponse> {
        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload;
        const user_id = sub

        const userTokens = await this.usersTokenRep.findByUserIdAndRefreshToken(
            user_id,
            token
        )

        if(!userTokens){
            throw new Error("Refresh token does not exists!").message
        }

        await this.usersTokenRep.deleteById(userTokens.id)

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

        const user = await this.userRepository.findById(user_id)

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token     
        })

        await this.usersTokenRep.create({
            user_id,
            expires_date,
            refresh_token
        });


        const newToken = sign({}, auth.secret,{
            subject: user_id,
            expiresIn: auth.expires_in_token
        });

        return {
            token: newToken,
            refresh_token
        };
    }
}

export { RefreshTokenUseCase }