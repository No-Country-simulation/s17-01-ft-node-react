import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { EmailParametersDto } from './dto/email-parameters.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendConfirmationEmail(parameters: EmailParametersDto) {
    const confirmationUrl = `${process.env.SERVER_URL}/confirm?token=${parameters.token}`;

    const mailOptions = {
      from: '"CodePieces" <no-reply@codepieces.com>',
      to: parameters.email,
      subject: 'Confirma tu cuenta',
      text: `Por favor, confirma tu cuenta haciendo clic en el siguiente enlace: ${confirmationUrl}`,
      html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Welcome to Talent Trade!</h2>
              <p>Hi, <strong>${parameters.username}</strong>,</p>
              <p>Thank you for registering with Talent Trade! You are almost done with the registration, you just need to confirm your email.</p>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${parameters.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirm account</a>
              </p>
              <p>Or you can copy and paste the following link into your browser:</p>
              <p><a href="${process.env.FRONTEND_URL}/auth/confirm-account/${parameters.token}" style="color: #4CAF50;">Click here</a></p>
              <p style="color: #888;">This token will expire in 30 minutes.</p>
              <p>If you did not register with Talent Trade, please ignore this email.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 Talent Trade. All rights reserved.</p>
            </div>
          </div>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
