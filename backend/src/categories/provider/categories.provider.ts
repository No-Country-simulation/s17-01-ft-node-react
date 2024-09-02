import { DataSource } from 'typeorm';
import { Category } from '../entities/category.entity';

export const categoryProvider = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
