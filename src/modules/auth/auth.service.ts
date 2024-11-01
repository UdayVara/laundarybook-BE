import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/PrismaService/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signupService(signupDto: SignUpDto) {
    try {
      const res = await this.prismaService.users.findFirst({
        where: {
          phone: signupDto.phone,
          
        },
      });
      if (res) {
        throw new BadRequestException('User Already Exists');
      } else {
        const hashedPass = bcrypt.hashSync(signupDto.password, 10);
        const newUser = await this.prismaService.users.create({
          data: {
            ...signupDto,
            password: hashedPass,
            is_active: true,
          },
        });

        const token = this.jwtService.sign({ id: newUser.id });
        if (newUser) {
          return {
            statusCode: 201,
            message: 'User Signup Successfully',
            user: newUser,
            token: token,
          };
        }

        throw new InternalServerErrorException('Internal Server Error');
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async signinService(signinDto: SignInDto) {
    try {
      const res = await this.prismaService.users.findFirst({
        where: {
          phone: signinDto.phone,
        },
      });

      if (!res) {
        throw new BadRequestException('User Does Not Exists');
      } else {
        const checkPass = bcrypt.compare(signinDto.password, res.password);

        if (checkPass) {
          const token = this.jwtService.sign({ id: res.id });

          if (token) {
            return { statusCode: 201, message: 'Signin Successfull', token };
          }
        }
        throw new InternalServerErrorException('Internal Server Error');

        throw new InternalServerErrorException('Internal Server Error');
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }
}
