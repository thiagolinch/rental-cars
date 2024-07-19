import { UserTokens } from "../entities/UserToken";

interface ICreateUserTokenDTO {
    user_id: string;
    expires_date: Date;
    refresh_token: string;
}

interface IUsersTokensRepository {

    create({user_id, expires_date, refresh_token}: ICreateUserTokenDTO): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
    findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UserTokens>;
    findByUserRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository, ICreateUserTokenDTO }