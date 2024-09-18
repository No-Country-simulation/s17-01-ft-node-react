import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Component } from './entities/component.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Plan } from 'src/plans/entities/plan.entity';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(createComponentDto: CreateComponentDto): Promise<Component> {
    const { uploader, categories, plan } = createComponentDto;
    if (
      uploader &&
      !(await this.userRepository.findOne({ where: { id: uploader.id } }))
    ) {
      throw new BadRequestException(
        `Uploader with ID ${uploader.id} not found`,
      );
    }
    if (categories) {
      for (const category of categories) {
        if (
          !(await this.categoryRepository.findOne({
            where: { id: category.id },
          }))
        ) {
          throw new BadRequestException(
            `Category with ID ${category.id} not found`,
          );
        }
      }
    }
    if (
      plan &&
      !(await this.planRepository.findOne({ where: { id: plan.id } }))
    ) {
      throw new BadRequestException(`Plan with ID ${plan.id} not found`);
    }
    const newComponent = this.componentRepository.create(createComponentDto);
    return await this.componentRepository.save(newComponent);
  }

  async findAll(): Promise<Partial<Component>[]> {
    const components = await this.componentRepository.find();
    if (components.length === 0) {
      throw new NotFoundException('No components available');
    }
    return components.map(
      ({ styles, structure, readme, ...component }) => component,
    );
  }

  async findByCategory(categories: number): Promise<Partial<Component>[]> {
    const components = await this.componentRepository
      .createQueryBuilder('component')
      .innerJoinAndSelect('component.categories', 'category')
      .where('category.id = :categories', { categories })
      .getMany();

    if (components.length === 0) {
      throw new NotFoundException(
        `No components found for category with ID ${categories}`,
      );
    }

    return components.map(
      ({ styles, structure, readme, ...component }) => component,
    );
  }

  async findByPlan(plan: number): Promise<Partial<Component>[]> {
    const components = await this.componentRepository
      .createQueryBuilder('component')
      .innerJoinAndSelect('component.plan', 'plan')
      .where('plan.id = :plan', { plan })
      .getMany();

    if (components.length === 0) {
      throw new NotFoundException(
        `No components found for plan with ID ${plan}`,
      );
    }

    return components.map(
      ({ styles, structure, readme, ...component }) => component,
    );
  }

  async findByCategoryAndPlan(
    categories: number,
    plan: number,
  ): Promise<Partial<Component>[]> {
    const components = await this.componentRepository
      .createQueryBuilder('component')
      .innerJoinAndSelect('component.categories', 'category')
      .innerJoinAndSelect('component.plan', 'plan')
      .where('category.id = :categories', { categories })
      .andWhere('plan.id = :plan', { plan })
      .getMany();

    if (components.length === 0) {
      throw new NotFoundException(
        `No components found for category with ID ${categories} and plan with ID ${plan}`,
      );
    }

    return components.map(
      ({ styles, structure, readme, ...component }) => component,
    );
  }

  async findByTier(tier: number): Promise<Component[]> {
    const components = await this.componentRepository
      .createQueryBuilder('component')
      .leftJoinAndSelect('component.plan', 'plan')
      .where(':tier = ANY(plan.tiers)', { tier })
      .getMany();
    if (components.length === 0) {
      throw new NotFoundException(
        `No components found for tier with ID ${tier}`,
      );
    }

    return components;
  }

  async findOne(id: number): Promise<Component> {
    const component = await this.componentRepository.findOne({
      where: { id },
      relations: ['categories', 'plan'],
    });
    if (!component) {
      throw new NotFoundException(`Component with ID ${id} not found`);
    }
    return component;
  }

  async update(
    id: number,
    updateComponentDto: UpdateComponentDto,
  ): Promise<Component> {
    const component = await this.componentRepository.preload({
      id,
      ...updateComponentDto,
    });
    if (!component) {
      throw new NotFoundException(`Component with ID ${id} not found`);
    }
    return this.componentRepository.save(component);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.componentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Component with ID ${id} not found`);
    }
    return {
      message: `Component with ID ${id} has been removed successfully`,
    };
  }
}
