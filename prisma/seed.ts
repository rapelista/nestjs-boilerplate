/* eslint-disable @typescript-eslint/no-require-imports */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

type UserType = {
  name: string;
  username: string;
};

async function generatePassword(password: string, saltOrRounds: number = 10) {
  return await hash(password, saltOrRounds);
}

async function main() {
  console.log('🌱 Seeding database...');

  const users: UserType[] = require('../prisma/data/DUMMY_USERS.json');
  const password = await generatePassword('password');

  await prisma.user.deleteMany();

  users.forEach(async (user, key) => {
    await prisma.user.upsert({
      where: {
        username: user.username,
      },
      update: {},
      create: {
        ...user,
        password,
        role: key < 10 ? 'ADMIN' : key < 40 ? 'MANAGER' : 'OWNER',
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
