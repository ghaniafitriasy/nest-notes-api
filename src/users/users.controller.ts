import { Controller, Get, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  deleteMe(@Req() req: any) {
    return this.usersService.deleteById(req.user.id);
  }
}
