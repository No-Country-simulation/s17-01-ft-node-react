import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

//DTO
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findOneByEmail(loginUserDto.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(loginUserDto.password, user.password);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    const { password, ...result } = user;

    return {
      status: 'success',
      message: 'Login success. You are now authenticated.',
      payload: {
        user: result,
        token: this.jwtService.sign(payload),
      },
    };
  }
}
