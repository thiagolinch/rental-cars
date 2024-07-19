import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import auth from "../../../config/auth";

import { UserRepository } from "../../../modules/accounts/repositories/implements/UserRepository";
import { UsersTokenRepotiroy } from "../../../modules/accounts/repositories/implements/UsersTokenRepository";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    // Preciso recuperar do header a info do toker do user
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error("Token missing")
    }

    // O token vem assim: "Bearer 08908748-14124456" e para poder usar eu preciso desestruturar ele.
    // Para isso vou usar o metodo split para dividir toda a info que recebi pelo "space".
    // A divisao dentro deste array sera:
    // [0] = Beare
    // [1] = 08908748-14124456
    // como nao quero pegar o primeiro dado passo pasar uma virgula de cara.
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret) as IPayLoad;

        request.user = {
            id: user_id
        }

        next()
    }catch{
      throw new Error("Invalid token!")
    }
}