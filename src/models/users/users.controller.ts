import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { CommonSchema } from 'src/commons/validations/zod/dto/common.dto';
import { PaginationSchema } from 'src/commons/validations/zod/dto/pagination.dto';
import {
  ZodValidateCommon,
  ZodValidatePagination,
} from 'src/commons/validations/zod/zod.decorator';
import { ZodValidationPipe } from 'src/commons/validations/zod/zod.pipe';
import { createUserSchema, CreateUserSchema } from './dto/create.dto';
import { UpdateUserSchema, updateUserSchema } from './dto/update.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll(@ZodValidatePagination() queries: PaginationSchema) {
    return this.service.findAll(queries);
  }

  @Get(':id')
  async findOne(@ZodValidateCommon() params: CommonSchema) {
    return this.service.findOne(params.id);
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserSchema,
  ) {
    const password = await hash('password', 10);
    return this.service.create({
      ...body,
      password,
    });
  }

  @Patch(':id')
  async update(
    @ZodValidateCommon() params: CommonSchema,
    @Body(new ZodValidationPipe(updateUserSchema)) body: UpdateUserSchema,
  ) {
    return this.service.update(params.id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@ZodValidateCommon() params: CommonSchema) {
    return this.service.remove(params.id);
  }
}
