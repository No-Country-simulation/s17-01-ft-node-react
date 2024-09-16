import { Inject, Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const existingPlan = await this.planRepository.findOne({ where: { name: createPlanDto.name } });
    
    if (existingPlan) {
      throw new ConflictException('Plan with this name already exists');
    }

    const newPlan = this.planRepository.create(createPlanDto);
    return await this.planRepository.save(newPlan);
  }

  async findAll(): Promise<Plan[]> {
    const plans = await this.planRepository.find();
    
    if (plans.length === 0) {
      throw new NotFoundException('No plans available');
    }

    return plans;
  }

  async findOneById(id: number): Promise<Plan> {

    const plan = await this.planRepository.findOne({ where: { id } });

    if (!plan) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }

    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const result = await this.planRepository.update(id, updatePlanDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }

    return this.findOneById(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.planRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Plan with ID ${id} not found`);
    }
    return { message: `Plan with ID ${id} was successfully deleted` };
  }
}