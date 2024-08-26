import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findAll() {
    throw new NotFoundException('users not found');
    return [];
  }
}
