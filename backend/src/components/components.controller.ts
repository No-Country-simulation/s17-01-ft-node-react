import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('components')
export class ComponentsController {
  constructor(
    private readonly componentsService: ComponentsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'UPLOADER') // Por ejemplo, solo los usuarios con estos roles pueden crear componentes
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  async findAll(
    @Query('categories') categories: string,
    @Query('plan') plan: string,
  ) {
    if (categories && plan) {
      return await this.componentsService.findByCategoryAndPlan(
        +categories,
        +plan,
      );
    } else if (categories) {
      return await this.componentsService.findByCategory(+categories);
    } else if (plan) {
      return await this.componentsService.findByPlan(+plan);
    }

    return this.componentsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    try {
      const components = await this.userService.findUserComponents(userId);
      if (
        components.status === 'success' &&
        components.payload.some((comp) => comp.id === +id)
      ) {
        return this.componentsService.findOne(+id);
      }
    } catch (error) {
      console.log('Error:', error);
    }
    const component = await this.componentsService.findOne(+id);
    if (!component) {
      throw new NotFoundException('Component not found.');
    }
    const { styles, structure, readme, ...componentWithoutSensitiveFields } =
      component;
    return {
      component: componentWithoutSensitiveFields,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'UPLOADER')
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'UPLOADER')
  remove(@Param('id') id: string) {
    return this.componentsService.remove(+id);
  }
}
