import { CIPHER_TEXT } from "./secrets.gen";
import secrets from "gitops-secrets";

let decryptedSecrets: null | {
  [key: string]: string;
} = null;

export const getSecret = (key: string) => {
  // in case you have some overrides in `.env.local`
  if (process.env.NODE_ENV === "development" && process.env[key]) {
    return process.env[key];
  }

  if (CIPHER_TEXT === null) {
    return undefined;
  }

  // only decrypt secrets the first time
  if (!decryptedSecrets) {
    decryptedSecrets = secrets.decrypt(CIPHER_TEXT);
  }

  return decryptedSecrets[key];
};
