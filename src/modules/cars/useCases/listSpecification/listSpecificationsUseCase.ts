import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository) {}

    async execute(): Promise<Specification[]> {
        const all = await this.specificationRepository.list()

        return all;
    };
};

export { ListSpecificationsUseCase }