import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './sign-in.dto';

export class UpdateAuthenticationDto extends PartialType(SignInDto) {}
