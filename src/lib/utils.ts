import * as bcrypt from 'bcrypt';

export async function generatePassword(
  password: string,
  saltOrRounds: number = 10,
) {
  return await bcrypt.hash(password, saltOrRounds);
}
