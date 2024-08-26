import { Prisma } from '@prisma/client';

export const select: Prisma.UserSelect = {
  id: true,
  name: true,
  username: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};
