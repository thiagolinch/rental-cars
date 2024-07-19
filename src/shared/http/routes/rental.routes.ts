import { Router } from "express";

import { CreateRentalController } from "../../../modules/rental/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "../../../modules/rental/useCases/devolutionRental/devolutionRentalController";
import { ListRentalsController } from "../../../modules/rental/useCases/listRentals/listRentalsController";
import { ListRentalsByUserController } from "../../../modules/rental/useCases/listRentalsByUser/listRentalsByUseController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";


const rentalRoute = Router();

const createRentalController = new CreateRentalController();
const listRentalsController = new ListRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoute.post("/", ensureAuthenticate, createRentalController.handle) 
rentalRoute.get("/", ensureAuthenticate, ensureAdmin, listRentalsController.handle)
rentalRoute.post("/devolution/:id", ensureAuthenticate, devolutionRentalController.handle)
rentalRoute.get("/user-rentals", ensureAuthenticate, listRentalsByUserController.handle)

export { rentalRoute }