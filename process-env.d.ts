export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET_KEY: string;
      NODEMAILER_USER: string;
      NODEMAILER_PASS: string;
    }
  }
}
