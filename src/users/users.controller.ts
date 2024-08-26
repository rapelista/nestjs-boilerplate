import { Body, Controller, Delete, Get, HttpCode, Patch } from '@nestjs/common';
import { CommonSchema } from 'src/zod/dto/common.dto';
import { PaginationSchema } from 'src/zod/dto/pagination.dto';
import {
  ZodValidateCommon,
  ZodValidatePagination,
} from 'src/zod/zod.decorator';
import { ZodValidationPipe } from 'src/zod/zod.pipe';
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
