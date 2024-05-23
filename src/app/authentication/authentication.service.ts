import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/common/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EnvConstants } from 'src/common/constants/env/env.constants';
import { Tokens } from 'src/common/types';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CheckEmailDto } from './dto/check-email.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(
      password + this.configService.get<string>(EnvConstants.passwordSecret),
      10,
    );
  }

  private verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(
      password + this.configService.get<string>(EnvConstants.passwordSecret),
      hashedPassword,
    );
  }

  private hashVerificationToken(email: string): Promise<string> {
    const verificationSecret = this.configService.get<string>(
      EnvConstants.verifyEmailSecret,
    );
    return bcrypt.hash(email + verificationSecret, 10);
  }

  async generateAccessToken(id: string) {
    return this.jwtService.signAsync(
      { id },
      {
        expiresIn: this.configService.get<string>(EnvConstants.accessTokenLife),
        secret: this.configService.get<string>(EnvConstants.accessTokenSecret),
      },
    );
  }

  async generateRefreshToken(id: string) {
    return this.jwtService.signAsync(
      { id },
      {
        expiresIn: this.configService.get<string>(
          EnvConstants.refreshTokenLife,
        ),
        secret: this.configService.get<string>(EnvConstants.refreshTokenSecret),
      },
    );
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>(EnvConstants.refreshTokenSecret),
    });

    const accessToken = await this.generateAccessToken(decoded.email);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async signUp(signUpDto: SignUpDto) {
    const existUser = await this.findUserByEmail(signUpDto.email);
    if (existUser !== null && existUser.verificationAt !== null) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(signUpDto.password);
    const verificationToken = await this.hashVerificationToken(signUpDto.email);
    await this.userModel.findOneAndUpdate(
      { email: signUpDto.email },
      {
        password: hashedPassword,
        verificationToken: verificationToken,
      },
      {
        upsert: true,
      },
    );
    return verificationToken;
  }

  async signIn(signInDto: SignInDto): Promise<Tokens> {
    const user = await this.userModel.findOne(
      { email: signInDto.email },
      {
        password: 1,
      },
    );
    if (!user) {
      throw new UnauthorizedException(
        'Email or password is incorrect. Please try again',
      );
    }
    const isPasswordMatch = await this.verifyPassword(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException(
        'Email or password is incorrect. Please try again',
      );
    }
    const tokens = await Promise.all([
      this.generateAccessToken(user.id),
      this.generateRefreshToken(user.id),
    ]);

    return {
      accessToken: tokens[0],
      refreshToken: tokens[1],
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.userModel.findOne(
      {
        email: verifyEmailDto.email,
        verificationToken: verifyEmailDto.token,
      },
      {
        verificationToken: 1,
        verificationAt: 1,
      },
    );

    if (!user) {
      throw new NotFoundException('Verification token is invalid');
    }
    if (user.verificationAt !== null) {
      throw new ConflictException('Email already verified');
    }
    if (user.verificationToken !== verifyEmailDto.token) {
      throw new NotFoundException('Verification token is invalid');
    }
    await this.userModel.findOneAndUpdate(
      { email: verifyEmailDto.email },
      {
        verificationToken: null,
        verificationAt: new Date(),
      },
    );
  }

  async checkEmailExists(payload: CheckEmailDto) {
    const user = await this.findUserByEmail(payload.email);
    return user !== null;
  }
}
