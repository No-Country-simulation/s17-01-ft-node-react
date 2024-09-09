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
    const mailOptions = {
      from: '"CodePieces" <no-reply@codepieces.com>',
      to: parameters.email,
      subject: 'Confirm you account.',
      text: `Please, confirm your email.`,
      html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Welcome to Code Pieces!</h2>
              <p>Hi, <strong>${parameters.username}</strong>,</p>
              <p>Thank you for registering with Code Pieces! You are almost done with the registration, you just need to confirm your email.</p>
              <p style="text-align: center;">
                <a href="${this.configService.get<string>('FRONTEND_URL')}/auth/confirm-account/${parameters.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirm account</a>
              </p>
              <p style="color: #888;">This token will expire in 30 minutes.</p>
              <p>If you did not register with Code Pieces, please ignore this email.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 Code Pieces. All rights reserved.</p>
            </div>
          </div>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendResetPasswordEmail(parameters: EmailParametersDto) {
    const mailOptions = {
      from: '"CodePieces" <no-reply@codepieces.com>',
      to: parameters.email,
      subject: 'Reset Password',
      text: `Please confirm your account by clicking the following link.`,
      html: ` 
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Password recovery</h2>
              <p>Hello, <strong>${parameters.username}</strong>,</p>
              <p>to choose a new password, please click the following link.</p>
              <p style="text-align: center;">
                <a href="${this.configService.get<string>('FRONTEND_URL')}/auth/reset-password/${parameters.token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #4CAF50; border-radius: 5px; text-decoration: none;">Confirmar Cuenta</a>
              </p>
              <p style="color: #888;">This token will expire in 30 minutes.</p>
              <p>If you did not request a password change, please ignore this message.</p>
              <p style="text-align: center; color: #888; font-size: 12px;">&copy; 2024 Code Pieces. All rights reserved.</p>
            </div>
          </div>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
