import { Connection, createConnection } from 'typeorm';
import { join } from 'path';
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
    // Carrega somente o formato compatível com o runtime atual.
    // O Node em produção não deve importar migrations TypeScript diretamente.
    migrations: [join(__dirname, 'migrations', `*.${__filename.endsWith('.ts') ? 'ts' : 'js'}`)],
    cli: { migrationsDir: 'src/shared/typeorm/migrations' },
  });
}
