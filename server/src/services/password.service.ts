import bcrypt from "bcrypt";

const hashPassword = async (plainPassword: string) => {
  const saltround = await bcrypt.genSalt(11);
  const hashed = await bcrypt.hash(plainPassword, saltround);
  return hashed;
};

const comparePassword = async (plaintext: string, hashed: string) => {
  const compared = await bcrypt.compare(plaintext, hashed);
  return compared;
};

export { hashPassword, comparePassword };
