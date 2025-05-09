import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../../entities/UserToken";
import { ICreateUserTokenDTO, IUsersTokensRepository } from "../IUsersTokenRepository";



class UsersTokenRepotiroy implements IUsersTokensRepository {
    private repository: Repository<UserTokens>

    constructor(){
        this.repository = getRepository(UserTokens)
    }


    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            user_id,
            expires_date,
            refresh_token
        });

        await this.repository.save(userToken);

        return userToken; 
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete({id})
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({
            user_id,
            refresh_token
        })
        return userTokens
    }

    async findByUserRefreshToken(refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOne({refresh_token})
    }

}

export { UsersTokenRepotiroy }