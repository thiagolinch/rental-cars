import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./uploadCarImageUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImageController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const images = request.files as IFiles[];
        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

        const image_name = images.map((file) => file.filename)

        try {
            await uploadCarImageUseCase.execute({image_name, car_id: id})
            return response.status(201).send()
        } catch (error) {
            
        }
    }
}

export { UploadCarImageController }