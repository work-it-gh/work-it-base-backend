export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      DATABASE_TYPE: string;
      DATABASE_NAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_HOST: string;
      DATABASE_USERNAME: string;
      SMTP_EMAIL: string;
      SMTP_PASSWORD: string;
      JWT_SECRET: string;
    }
  }
}
