export const config = {
  PORT: process.env.PORT as string,
  DATABASE_TYPE: process.env.DATABASE_TYPE as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  DATABASE_HOST: process.env.DATABASE_HOST as string,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME as string,
  SMTP_EMAIL: process.env.SMTP_EMAIL as string,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
