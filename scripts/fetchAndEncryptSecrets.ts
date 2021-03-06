import Cryptr from "cryptr";
import fs from "fs/promises";

import gitopsSecrets from "@larskarbo/gitops-secrets";
import { ENCRYPTED_SECRETS_FILE } from "../src/utils";

async function main() {
  const payload = await gitopsSecrets.providers.doppler.fetch();

  if (!process.env.SECRETS_KEY) {
    throw new Error("SECRETS_KEY is not set");
  }

  const cryptr = new Cryptr(process.env.SECRETS_KEY);

  const encryptedText = cryptr.encrypt(JSON.stringify(payload));

  await fs.writeFile(ENCRYPTED_SECRETS_FILE, encryptedText);

  let envFile = "";

  Object.entries({
    ...payload,
  })
    .filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
    .forEach(([key, value]) => {
      envFile += `${key}=${value}\n`;
    });

  envFile += `DOPPLER_TOKEN=${process.env.DOPPLER_TOKEN}\n`;
  envFile += `SECRETS_KEY=${process.env.SECRETS_KEY}\n`;

  await fs.writeFile(".env", envFile);
}

void main();
