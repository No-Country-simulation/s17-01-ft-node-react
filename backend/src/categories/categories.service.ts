import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (categories.length === 0) {
      throw new NotFoundException('No categories available');
    }
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const result = await this.categoryRepository.update(id, updateCategoryDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return {
      message: `Category with ID ${id} has been removed successfully`,
    };
    
  }
}