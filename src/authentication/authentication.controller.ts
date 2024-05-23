import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CheckEmailExistDto } from './dto/check-email-exist.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return 'Sign in';
  }

  @Post('sign-up')
  signUp(@Body() signInDto: SignUpDto) {
    return 'Sign up';
  }

  @Get('check-email-exists/:email')
  checkEmailExists(@Param('email') email: CheckEmailExistDto) {
    return 'Check email exists';
  }
}
