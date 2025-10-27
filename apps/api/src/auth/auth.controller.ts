import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { JwtUser } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  async testAuth(@CurrentUser() user: JwtUser) {
    return {
      message: 'Authentication successful!',
      user: {
        userId: user.userId,
        provider: user.provider,
        providerId: user.providerId,
        sub: user.sub,
        scopes: user.scopes,
      },
    };
  }
}
