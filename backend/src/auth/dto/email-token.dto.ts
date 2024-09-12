import { IsString } from 'class-validator';

export class EmailTokenDto {
  @IsString()
  token: string;
}
