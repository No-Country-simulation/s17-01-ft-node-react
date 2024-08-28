import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'ep-crimson-feather-a4528ejb-pooler.us-east-1.aws.neon.tech',
        port: 5432,
        username: 'default',
        password: 'y9mIsTMvgCk3',
        database: 'verceldb',
        entities: [User],
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      });

      return dataSource.initialize();
    },
  },
];
