import fs from "fs"
import { parse as csvParse} from "csv-parse"

import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";


interface IImportSpecification {
    name: string;
    description: string;
}

@injectable()
class ImportSpecificationUseCase{
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ){}

    loadImportSpecifications(file: Express.Multer.File): Promise<IImportSpecification[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const specifications: IImportSpecification[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;

                specifications.push({
                    name,
                    description
                })
            }).on("end", () => {
                resolve(specifications)
            }).on("error", (err) => {
                reject(err)
            })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const specifications = await this.loadImportSpecifications(file);

        specifications.map(
            async (specification) => {
                const { name, description } = specification;

                const existsSpecification = await this.specificationRepository.findByName(name)

                if(existsSpecification) {
                   throw new Error("Specification already exists");
                }

                await this.specificationRepository.create({name, description})
            }
        )
    }
}

export { ImportSpecificationUseCase }