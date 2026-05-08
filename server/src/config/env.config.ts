import dotenv from "dotenv";

dotenv.config({ quiet: true });

function getEnv(key: string): string {
  const valstr = process.env[key];
  if (!valstr) {
    throw new Error(`env ${key}  is missing`);
  }
  return valstr;
}

function getEnvNumber(key: string): number {
  const val = getEnv(key);

  const num = Number(val);

  if (Number.isNaN(num)) {
    throw new Error(`${key} should be a number`);
  }

  return num;
}

export const ENV = {
  PORT: getEnvNumber("PORT"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET"),
  CLOUDINARY_URL: getEnv("CLOUDINARY_URL"),
};
