import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);
    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
