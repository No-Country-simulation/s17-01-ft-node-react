import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'tu-email@example.com',
        pass: 'tu-contraseña',
      },
    });
  }

  async sendConfirmationEmail(email: string, token: string) {
    const confirmationUrl = `http://tu-dominio.com/confirm?token=${token}`;

    const mailOptions = {
      from: '"Tu Aplicación" <no-reply@tu-dominio.com>',
      to: email,
      subject: 'Confirma tu cuenta',
      text: `Por favor, confirma tu cuenta haciendo clic en el siguiente enlace: ${confirmationUrl}`,
      html: `<p>Por favor, confirma tu cuenta haciendo clic en el siguiente enlace: <a href="${confirmationUrl}">Confirmar cuenta</a></p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
