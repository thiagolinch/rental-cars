import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { ListSpecificationsController } from "./listSpecificationsController";
import { ListSpecificationsUseCase } from "./listSpecificationsUseCase";


/* export default (): ListSpecificationsController => {
    const specificationRepository = new SpecificationRepository()

    const listSpecificationUseCase = new ListSpecificationsUseCase(specificationRepository);
    
    const listSpecificationController = new ListSpecificationsController(listSpecificationUseCase);
    
    return listSpecificationController
} */