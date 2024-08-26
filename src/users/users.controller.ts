import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/zod/zod.pipe';
import { UsersFilterSchema, usersFilterSchema } from './dto/filter.dto';
import { UserSchema, userSchema } from './entities/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(usersFilterSchema))
  async findAll(@Query() queries: UsersFilterSchema) {
    return this.service.findAll(queries);
  }

  @Get(':id')
  @UsePipes(new ZodValidationPipe(userSchema.pick({ id: true })))
  async findOne(@Param() { id }: Pick<UserSchema, 'id'>) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(userSchema.pick({ id: true })))
  async remove(@Param() { id }: Pick<UserSchema, 'id'>) {
    return this.service.remove(id);
  }
}
