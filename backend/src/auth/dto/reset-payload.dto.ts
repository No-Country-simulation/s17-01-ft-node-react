import { IsString } from 'class-validator';

export class ResetPayloadDto {
  @IsString()
  email: string;
}
