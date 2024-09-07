import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Component } from './entities/component.entity';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
  ) {}

  create(createComponentDto: CreateComponentDto) {
    return 'This action adds a new component';
  }

  findAll() {
    return `This action returns all components`;
  }

  findOne(id: number) {
    return `This action returns a #${id} component`;
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return `This action updates a #${id} component`;
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
