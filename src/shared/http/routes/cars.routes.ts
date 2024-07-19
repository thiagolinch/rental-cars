import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../config/upload"

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

import { CreateCarController } from "../../../modules/cars/useCases/createCar/createCarController";
import { ListAvailableCarsController } from "../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { CreateCarSpecificationsController } from "../../../modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { UploadCarImageController } from "../../../modules/cars/useCases/uploadCarImage/uploadCarImageController";



const carsRoutes = Router()

const uploadCarImage = multer(uploadConfig)

const createCarController = new CreateCarController()
const uploadCarImageController = new UploadCarImageController()
const listAvailableController = new ListAvailableCarsController()
const createCarsSpecificationsController = new CreateCarSpecificationsController();

carsRoutes.post("/", ensureAuthenticate, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableController.handle)
carsRoutes.post("/specifications/:id", ensureAuthenticate, ensureAdmin, createCarsSpecificationsController.handle)
carsRoutes.post("/images/:id", ensureAuthenticate, ensureAdmin, uploadCarImage.array("images"),uploadCarImageController.handle)

export { carsRoutes }