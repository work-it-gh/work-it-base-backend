export const config = {
  PORT: process.env.PORT as string,
  JWT_SECRET: process.env.JWT_SECRET_KEY as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
};
