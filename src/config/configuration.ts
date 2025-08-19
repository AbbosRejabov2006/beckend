import { Logger } from "@nestjs/common";

// Function to ensure environment variables exist
function requireEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    const logger = new Logger("ConfigValidation");
    logger.error(`Environment variable ${key} is not defined!`);
    throw new Error(`Required environment variable ${key} is not defined`);
  }

  return value;
}

// This allows type checking and autocompletion for all environment variables
export interface AppConfig {
  port: number;
  database: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  redis: {
    host: string;
    port: number;
    password: string;
    mock: boolean;
  };
  firebase: {
    projectId: string;
    clientEmail: string;
    privateKey: string | undefined;
    mock: boolean;
  };
  paddle: {
    vendorId: string;
    vendorAuthCode: string;
    publicKey: string | undefined;
  };
  email: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
  octo: {
    merchantId: string;
    secretKey: string;
    baseUrl: string;
  };
  env: {
    isProduction: boolean;
  };
}

export default (): AppConfig => ({
  port: parseInt(requireEnv("PORT", "5000"), 10),
  database: {
    url: requireEnv("DATABASE_URL"),
  },
  jwt: {
    secret: requireEnv("JWT_SECRET", "super-secret-key-for-dev-only"),
    expiresIn: requireEnv("JWT_EXPIRES_IN", "30d"),
  },
  redis: {
    host: requireEnv("REDIS_HOST", "localhost"),
    port: parseInt(requireEnv("REDIS_PORT", "6379"), 10),
    password: requireEnv("REDIS_PASSWORD", ""),
    mock: requireEnv("REDIS_MOCK", "true") === "true",
  },
  firebase: {
    projectId: requireEnv("FIREBASE_PROJECT_ID", ""),
    clientEmail: requireEnv("FIREBASE_CLIENT_EMAIL", ""),
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    mock: requireEnv("FIREBASE_MOCK", "true") === "true",
  },
  paddle: {
    vendorId: requireEnv("PADDLE_VENDOR_ID", ""),
    vendorAuthCode: requireEnv("PADDLE_VENDOR_AUTH_CODE", ""),
    publicKey: process.env.PADDLE_PUBLIC_KEY?.replace(/\\n/g, "\n"),
  },
  email: {
    host: requireEnv("EMAIL_HOST", ""),
    port: parseInt(requireEnv("EMAIL_PORT", "587"), 10),
    user: requireEnv("EMAIL_USER", ""),
    pass: requireEnv("EMAIL_PASS", ""),
    from: requireEnv("EMAIL_FROM", "noreply@example.com"),
  },
  octo: {
    merchantId: requireEnv("OCTO_MERCHANT_ID", ""),
    secretKey: requireEnv("OCTO_SECRET_KEY", ""),
    baseUrl: requireEnv("OCTO_BASE_URL", "https://api.octo.uz"),
  },
  env: {
    isProduction: requireEnv("NODE_ENV", "development") === "production",
  }
});
