import { DaysJSDateProvider } from "../../../../shared/container/providers/DateProvider/implemantations/DayJsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory"
import { UserTokenRepositoryInMemory } from "../../repositories/in-memory/UserTokensRepositoryInMemory";
import { SendForgotPasswordUseCase } from "./sendForgotPasswordEmailUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let userTokenRepository: UserTokenRepositoryInMemory;
let dateJs: DaysJSDateProvider;
let mailProvider: MailProviderInMemory;
let sendForgotPasswordUseCase: SendForgotPasswordUseCase;

describe("Send forgot email test", () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userTokenRepository = new UserTokenRepositoryInMemory();
        dateJs = new DaysJSDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordUseCase =new SendForgotPasswordUseCase(
            userRepositoryInMemory,
            userTokenRepository,
            dateJs,
            mailProvider
        );
    });

    it("Should be able to send a forgot passsword email to user", async () => {
        const sendEmail  = jest.spyOn(mailProvider, "sendMail");

        await userRepositoryInMemory.create({
            name: "Elijah Walton",
            email: "epnivor@ebho.pa",
            password: "1234",
            driver_license: "21079424"
        });

        await sendForgotPasswordUseCase.execute("epnivor@ebho.pa")

        expect(sendEmail).toHaveBeenCalled();
    });

    it("Should not be able to send a email to a non existent user", async () => {
        await expect(sendForgotPasswordUseCase.execute("thiago@gmail.com")).rejects.toEqual("User does not exists")
    });

    it("Should be able to create a new user token to recovery the password", async () => {
        const generateToken = jest.spyOn(userTokenRepository, "create")

        userRepositoryInMemory.create({
            name: "Lillie Byrd",
            email: "bojuw@dop.pr",
            password: "1234",
            driver_license: "2807959"
        })

        await sendForgotPasswordUseCase.execute("bojuw@dop.pr");

        expect(generateToken).toBeCalled()
    })
})