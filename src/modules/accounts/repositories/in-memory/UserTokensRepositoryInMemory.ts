import { UserTokens } from "../../entities/UserToken";
import { ICreateUserTokenDTO, IUsersTokensRepository } from "../IUsersTokenRepository";


class UserTokenRepositoryInMemory implements IUsersTokensRepository {
    usersToken: UserTokens[] = [];

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            user_id,
            refresh_token,
            expires_date
        });

        this.usersToken.push(userToken)

        return userToken
    }
    async deleteById(id: string): Promise<void> {
        const userTokenToDelete = this.usersToken.findIndex((token) => token.id === id);
        this.usersToken.splice(userTokenToDelete, 1)

    }
    async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens> {
        const userToken = this.usersToken.find(ut => ut.user_id === user_id && ut.refresh_token && token);
        return userToken
    }
    async findByUserRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.usersToken.find((user) => user.refresh_token === refresh_token);
        return userToken;
    }

}

export { UserTokenRepositoryInMemory }