import { ConflictException, Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

//DTO
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(loginInfo: LoginUserDto): Promise<any> {
    const user = await this.userService.findOneByEmail(loginInfo.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await compare(loginInfo.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const payload = { email: user.email, sub: user.id };

    const { password, ...result } = user;

    return {
      status: 'success',
      message: 'Login success. Token generated.',
      payload: {
        user: result,
        token: this.jwtService.sign(payload, { expiresIn: '3h' }),
      },
    };
  }

  async sentConfirmationEmail(registerInfo: CreateUserDto) {
    const user = await this.userService.findOneByEmail(registerInfo.email);

    if (user) {
      throw new ConflictException('User email is already registered.');
    }

    const saltRounds = +this.configService.get<number>(
      'BCRYPT_SALT_ROUNDS',
      10,
    );
    console.log(typeof saltRounds);
    const hashedPassword = await hash(registerInfo.password, saltRounds);

    const payload = {
      username: registerInfo.username,
      email: registerInfo.email,
      password: hashedPassword,
    };

    let token: string;

    try {
      token = this.jwtService.sign(payload, { expiresIn: '1h' });
    } catch (error) {
      console.error('Error signing JWT token:', error);
      throw new InternalServerErrorException('Failed to generate token.');
    }

    const parameters = {
      username: registerInfo.username,
      email: registerInfo.email,
      token: token,
    };

    await this.mailService.sendConfirmationEmail(parameters);

    return {
      status: 'success',
      message: 'Your account confirmation email has been sent.',
      payload: null,
    };
  }

  async registerUser(token: string) {
    let jwtPayload: CreateUserDto;

    try {
      jwtPayload = this.jwtService.verify<CreateUserDto>(token);
    } catch (error) {
      console.error('Error verifying JWT token:', error);
      throw new UnauthorizedException('Invalid or expired token.');
    }

    const user = await this.userService.findOneByEmail(jwtPayload.email);

    if (user) {
      throw new ConflictException('User email is already registered.');
    }

    const newUser = await this.userService.create(jwtPayload);

    const { password, ...result } = newUser;
    const payload = { email: newUser.email, sub: newUser.id };

    return {
      status: 'success',
      message: 'User successfully registered and token generated.',
      payload: {
        user: result,
        token: this.jwtService.sign(payload, { expiresIn: '3h' }),
      },
    };
  }
}
