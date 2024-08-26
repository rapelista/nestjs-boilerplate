import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersFilterSchema } from './dto/filter.dto';
import { select } from './dto/select.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ page, limit }: UsersFilterSchema) {
    const data = await this.prisma.user.findMany({
      take: limit,
      skip: (page - 1) * limit,
      select,
    });

    const total_data = await this.prisma.user.count();
    const meta = {
      page,
      total_data,
      total_page: Math.ceil(total_data / limit),
    };

    return { data, meta };
  }

  async findOne(id: number) {
    const data = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select,
    });
    return { data };
  }

  async update(id: number, body: Prisma.UserUpdateInput) {
    await this.findOne(id);

    const data = await this.prisma.user.update({
      where: { id },
      data: body,
      select,
    });

    return { data };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
