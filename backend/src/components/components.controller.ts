import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'uploader') // Por ejemplo, solo los usuarios con estos roles pueden crear componentes
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  async findAll(
    @Query('categories') categories: string,
    @Query('plan') plan: string
  ){
    if (categories && plan) {
      return await this.componentsService.findByCategoryAndPlan(+categories, +plan);
    } else if (categories) {
      return await this.componentsService.findByCategory(+categories);
    } else if (plan) {
      return await this.componentsService.findByPlan(+plan);
    }

    return this.componentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'uploader')
  update(@Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'uploader')
  remove(@Param('id') id: string) {
    return this.componentsService.remove(+id);
  }
}
