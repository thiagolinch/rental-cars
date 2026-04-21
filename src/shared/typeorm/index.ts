import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { User } from '../../modules/accounts/entities/User';
import { UserTokens } from '../../modules/accounts/entities/UserToken';
import { Car } from '../../modules/cars/entities/Car';
import { CarImage } from '../../modules/cars/entities/CarImage';
import { Category } from '../../modules/cars/entities/Category';
import { Specification } from '../../modules/cars/entities/Specification';
import { Rental } from '../../modules/rental/entities/Rental';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'aws-1-us-west-2.pooler.supabase.com';

  createConnection({
    ...options,
    entities: [
      Category,
        Specification,
        User,
        Car,
        CarImage,
        Rental,
        UserTokens
    ],
    migrations: [
      // esse caminho é relativo a partir do build, ou seja, dist/
      './typeorm/migrations/*.js'
    ],
    cli: {
      migrationsDir: 'src/shared/typeorm/migrations',
    }
  });
});

export { createConnection }