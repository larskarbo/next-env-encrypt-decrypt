import Cryptr from "cryptr";
import fs from "fs/promises";

import secrets from "gitops-secrets";

async function main() {
  const payload = await secrets.providers.doppler.fetch();

  if (!process.env.GITOPS_SECRETS_MASTER_KEY) {
    throw new Error("GITOPS_SECRETS_MASTER_KEY is not set");
  }

  const cryptr = new Cryptr(process.env.GITOPS_SECRETS_MASTER_KEY);

  const encryptedText = cryptr.encrypt(JSON.stringify(payload));

  await fs.writeFile(".encrypted-secrets", encryptedText);

  let envFile = "";

  Object.entries({
    ...payload,
  })
    .filter(([key]) => key.startsWith("NEXT_PUBLIC_"))
    .forEach(([key, value]) => {
      envFile += `${key}=${value}\n`;
    });

  envFile += `DOPPLER_TOKEN=${process.env.DOPPLER_TOKEN}\n`;
  envFile += `GITOPS_SECRETS_MASTER_KEY=${process.env.GITOPS_SECRETS_MASTER_KEY}\n`;

  await fs.writeFile(".env", envFile);
}

void main();
