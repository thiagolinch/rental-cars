import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";


class RefreshTokenController {

    async handle(request: Request, response: Response): Promise<Response> {
        const token = request.body.token || request.headers["x-access-token"] || request.query.token

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

        try {
            const returnResfreshToken = await refreshTokenUseCase.execute(token)
            return response.status(200).json({returnResfreshToken})
        } catch (error) {
            response.status(400).json({error})
        }
    }
}

export { RefreshTokenController }