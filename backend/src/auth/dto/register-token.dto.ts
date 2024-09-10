import { IsString } from 'class-validator';

export class RegisterTokenDto {
  @IsString()
  token: string;
}
