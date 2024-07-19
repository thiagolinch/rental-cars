import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 }  from "uuid"
import { resolve } from "path"

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";

import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokenRepository";


@injectable()
class SendForgotPasswordUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DaysJSDateProvider")
        private dayJsProvidader: IDateProvider,
        @inject("EtherealMailProvider")
        private etherealMailProvider: IMailProvider
    ){}

    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new Error("User does not exists").message
        }

        const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgotPassword.hbs")

        const token = uuidV4();
        const expires_date = this.dayJsProvidader.addHours(3)

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.etherealMailProvider.sendMail(email, "Recuperação de senha", variables, templatePath)
    }
}

export { SendForgotPasswordUseCase }