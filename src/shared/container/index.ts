import { container } from 'tsyringe';

import "./providers"

import { UserRepository } from '../../modules/accounts/repositories/implements/UserRepository';
import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';

import { ICarRepository } from '../../modules/cars/repositories/ICarRepository';
import { CarsRepository } from '../../modules/cars/repositories/implementations/CarsRepository';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';

import { ICarImageRepository } from '../../modules/cars/repositories/ICarImageRepository';
import { CarImageRepository } from '../../modules/cars/repositories/implementations/CarImage';

import { IRentalRepository } from '../../modules/rental/repositories/IRentalRepository';
import { RentalRepository } from '../../modules/rental/repositories/implements/RentalRepository';

import { UsersTokenRepotiroy } from '../../modules/accounts/repositories/implements/UsersTokenRepository';
import { IUsersTokensRepository } from '../../modules/accounts/repositories/IUsersTokenRepository';

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
)

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
)

container.registerSingleton<ICarRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarImageRepository>(
    "CarImageRepository",
    CarImageRepository
)

container.registerSingleton<IRentalRepository>(
    "RentalRepository",
    RentalRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokenRepository",
    UsersTokenRepotiroy
)