import { Router } from "express";
import multer from 'multer'
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

import {CreateSpecificationController}  from "../../../modules/cars/useCases/createSpecification/createSpecificationController";
import { ImportSpecificationController } from "../../../modules/cars/useCases/importSpecification/importSpecificationController";
import {ListSpecificationsController} from "../../../modules/cars/useCases/listSpecification/listSpecificationsController";

const specificationRoutes = Router();

const upload = multer({dest: "./tmp"})

const createSpecificationController = new CreateSpecificationController()
const importSpecificationController = new ImportSpecificationController()
const listSpecificationController = new ListSpecificationsController()


specificationRoutes.use(ensureAuthenticate)
specificationRoutes.post("/", createSpecificationController.handle)
specificationRoutes.post("/import", upload.single("file"), importSpecificationController.handle)
specificationRoutes.get("/", listSpecificationController.handle)

export { specificationRoutes }