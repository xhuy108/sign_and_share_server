import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { ApiTags } from '@nestjs/swagger';
import { Tokens } from 'src/common/types';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authenticationService.signIn(signInDto);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const str = await this.authenticationService.signUp(signUpDto);
    console.log(str);
    return 'Sign up successfully. Please check your email to verify your account. \n If you do not receive the email, please check your spam folder.';
  }

  @Get('check-email-exists/:email')
  checkEmailExists(@Param('email') email: CheckEmailDto) {
    return 'Check email exists';
  }

  @Post('verify-email')
  verifyEmail(@Query() verifyEmailDto: VerifyEmailDto) {
    return this.authenticationService.verifyEmail(verifyEmailDto);
  }
}
