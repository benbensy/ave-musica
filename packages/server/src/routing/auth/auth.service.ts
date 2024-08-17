import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(username: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: { name: username },
    });
    // 暂时明文
    if (user?.password !== pass) {
      return new UnauthorizedException();
    }

    const { password, ...result } = user;

    return result;
  }
}
