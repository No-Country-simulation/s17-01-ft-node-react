import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsOptional() // Este campo es opcional si no siempre se va a pasar un plan
  @IsNumber()
  planId?: number;

  @IsOptional() // Este campo es opcional si no siempre se va a pasar un componente
  @IsNumber()
  componentId?: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
