import { DaysJSDateProvider } from "../../../../shared/container/providers/DateProvider/implemantations/DayJsDateProvider";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "../../repositories/in-memory/UserTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"


describe("Authenticate User", () => {
	let authenticateUserUseCase: AuthenticateUserUseCase;
	let userRepositoryInMemory: UserRepositoryInMemory;
	let createUserUseCase: CreateUserUseCase;
	let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;
	let dayJsProvider: DaysJSDateProvider;
	
	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
		dayJsProvider = new DaysJSDateProvider();
		authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory,userTokenRepositoryInMemory, dayJsProvider);
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
	})

	it("should be able to authenticate a user", async () => {
		const user: ICreateUserDTO = {
			name: "User Test",
			password: "12345",
			email: "user@test.com",
			driver_license: "00922"
		}

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password
		});

		expect(result).toHaveProperty("token");
	})
    it("should not be able to authenticate a nonexistent user", async() => {
        await expect(authenticateUserUseCase.execute({
                email: "thiago@test.com",
                password: "1234"
            })
        ).rejects.toEqual(new Error("E-mail or Password invalid"))
    });

    it("should not be able to authenticate with a incorrect password", async() => {
		const user: ICreateUserDTO = {
			name: "User Test",
			password: "12345",
			email: "user@test.com",
			driver_license: "00922"
		}

		await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase.execute({
                email: "user@test.com",
                password: "12344"
            })
        ).rejects.toEqual(new Error("E-mail or Password invalid"))
    });
})