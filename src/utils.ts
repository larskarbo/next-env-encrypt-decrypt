let decryptedSecrets: null | {
  [key: string]: string;
} = null;

import { readFileSync } from "fs";

import Cryptr from "cryptr";
import path from "path";

export const ENCRYPTED_SECRETS_FILE = ".encrypted-secrets";

export const getSecret = (key: string) => {
  // in case you have some overrides in `.env.local`
  if (process.env.NODE_ENV === "development" && process.env[key]) {
    return process.env[key];
  }

  // only decrypt secrets the first time
  if (!decryptedSecrets) {
    if (!process.env.GITOPS_SECRETS_MASTER_KEY) {
      return undefined;
    }

    const encryptedSecrets = readFileSync(
      path.join(process.cwd(), ENCRYPTED_SECRETS_FILE),
      "utf8"
    );
    const cryptr = new Cryptr(process.env.GITOPS_SECRETS_MASTER_KEY);
    decryptedSecrets = JSON.parse(cryptr.decrypt(encryptedSecrets));
  }

  return decryptedSecrets?.[key];
};
