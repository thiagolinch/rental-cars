import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { User } from '../../modules/accounts/entities/User';
import { UserTokens } from '../../modules/accounts/entities/UserToken';
import { Car } from '../../modules/cars/entities/Car';
import { CarImage } from '../../modules/cars/entities/CarImage';
import { Category } from '../../modules/cars/entities/Category';
import { Specification } from '../../modules/cars/entities/Specification';
import { Rental } from '../../modules/rental/entities/Rental';

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === "test" ? "rentx_database" : defaultOptions.database,
      entities: [
        Category,
        Specification,
        User,
        Car,
        CarImage,
        Rental,
        UserTokens
      ]
    })
  );
};