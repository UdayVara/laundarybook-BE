import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({
    type: SignUpDto,
    description:"API For Creating New User"
  })
  async signup(@Body() signupDto: SignUpDto) {
    return this.authService.signupService(signupDto);
  }


  @Post('signin')
  @ApiBody({
    type: SignInDto,
    description:"API For Signing Up The User "
  })
  async signin(@Body() signinDto: SignInDto) {
    return this.authService.signinService(signinDto);
  }
}
