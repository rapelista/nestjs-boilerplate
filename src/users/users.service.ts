import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersFilterSchema } from './dto/filter.dto';
import { select } from './dto/select.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ page, limit }: UsersFilterSchema) {
    const total_data = await this.prisma.user.count();
    const data = await this.prisma.user.findMany({
      take: limit,
      skip: (page - 1) * limit,
      select,
    });

    return {
      data,
      meta: {
        page,
        total_data,
        total_page: Math.ceil(total_data / limit),
      },
    };
  }

  async findOne(id: number) {
    const data = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select,
    });
    return { data };
  }

  async remove(id: number) {
    /**
     * @todo: Custom Error for Delete, so we can delete without checking first.
     */
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
