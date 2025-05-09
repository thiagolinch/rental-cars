import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoute } from "./rental.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoute);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes);
export { router }