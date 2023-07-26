import bcrypt from 'bcrypt';
import config from '../../../config';

export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(
      password,
      Number(config.bycrypt_salt_rounds)
    );
    return hash;
  } catch (err) {
    console.error(err);000
    throw err;
  }
}
