export class PaymentResponseDto {
    id: number;
    amount: number;
    date: Date;
    status: string;
    user: { id: number; username: string; email: string };  
    component?: { id: number; name: string; price: number };  
    plan?: { id: number; name: string }; 
  }