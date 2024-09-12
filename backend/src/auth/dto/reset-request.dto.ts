import { IsString } from 'class-validator';

export class ResetRequestDto {
  @IsString()
  email: string;
}
