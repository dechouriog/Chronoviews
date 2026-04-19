import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';

import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { User } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const existing = await this.usersService.findByEmail(registerDto.email);

    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    return this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      role: 'user',
    });
  }
}