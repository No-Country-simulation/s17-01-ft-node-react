import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDetailDto {
  @IsNotEmpty()
  @IsString()
  cbu: string;

  @IsNotEmpty()
  @IsString()
  alias: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cuil: string;
}
