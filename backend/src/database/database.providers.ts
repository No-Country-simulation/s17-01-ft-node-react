import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      return dataSource.initialize();
    },
  },
];
