import { Connection, createConnection } from 'typeorm';
import { User } from '../../modules/accounts/entities/User';
import { UserTokens } from '../../modules/accounts/entities/UserToken';
import { Car } from '../../modules/cars/entities/Car';
import { CarImage } from '../../modules/cars/entities/CarImage';
import { Category } from '../../modules/cars/entities/Category';
import { Specification } from '../../modules/cars/entities/Specification';
import { Rental } from '../../modules/rental/entities/Rental';

export async function connectDatabase(connectionUrl?: string): Promise<Connection> {
  const databaseUrl = connectionUrl || process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL nao configurada.');
  }

  return createConnection({
    type: 'postgres',
    url: databaseUrl,
    ssl: { rejectUnauthorized: true },
    entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
    migrations: [
      'src/shared/typeorm/migrations/*.ts',
      'dist/src/shared/typeorm/migrations/*.js',
    ],
    cli: { migrationsDir: 'src/shared/typeorm/migrations' },
  });
}
