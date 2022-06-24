import fs from "fs/promises";
import secrets from "gitops-secrets";

async function main() {
  const payload = await secrets.providers.doppler.fetch();

  let envFile = "";

  Object.entries({
    ...payload,
  }).forEach(([key, value]) => {
    envFile += `${key}=${value}\n`;
  });

  envFile += `DOPPLER_TOKEN=${process.env.DOPPLER_TOKEN}\n`;

  await fs.writeFile(".env", envFile);
}

void main();
