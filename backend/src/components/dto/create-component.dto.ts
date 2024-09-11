import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsPositive,
    IsArray,
    IsUrl,
    IsInt,
    Max,
    Min,
  } from 'class-validator';
  import { User } from 'src/user/entities/user.entity';
  import { Category } from 'src/categories/entities/category.entity';
  import { Plan } from 'src/plans/entities/plan.entity';
  
  export class CreateComponentDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
    @IsNotEmpty({ message: 'Uploader is required' })
    uploader: User;
  
    @IsArray()
    @IsOptional()
    buyers?: User[];
  
    @IsNumber()
    @IsPositive({ message: 'Price must be a positive number' })
    price: number;
  
    @IsArray()
    @IsNotEmpty({ message: 'Categories are required' })
    categories: Category[];
  
    @IsNotEmpty({ message: 'Plan is required' })
    plan: Plan;
  
    @IsString()
    @IsOptional()
    styles?: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Structure is required' })
    structure: string;
  
    @IsNumber()
    @IsOptional() 
    @Min(0, { message: 'Rating must be between 0 and 5' })
    @Max(5, { message: 'Rating must be between 0 and 5' })
    rating: number;
  
    @IsString()
    @IsNotEmpty({ message: 'Description is required' })
    description: string;
  
    @IsUrl({}, { message: 'Please provide a valid URL for the video' })
    @IsNotEmpty({ message: 'Video URL is required' })
    video: string;
  
    @IsUrl({}, { message: 'Please provide a valid URL for the image' })
    @IsNotEmpty({ message: 'Image URL is required' })
    image: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Readme is required' })
    readme: string;
  
    @IsInt()
    @IsOptional() 
    @Min(0, { message: 'Downloads must be a non-negative number' })
    downloads: number;

    @IsString()
    @IsOptional() 
    tier: string; 
  }
  