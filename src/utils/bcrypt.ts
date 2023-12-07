import * as bcryptjs from 'bcryptjs';

export async function encodePassword(password: string) {
  const saltRounds = 10; // Número de rondas de sal
  const hashedPassword = await bcryptjs.hash(password, saltRounds);
  return hashedPassword;
}
