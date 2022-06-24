# next-env-encrypt-decrypt

This is an example repository for how to work around Vercel's 4kb restriction in a Nextjs project using an external secrets provider. We are using [Doppler](https://doppler.com/) here, but you could use whatever you want.

This way of handling secrets achieves two things:

- ✅ No 4kb environment variable restriction
- ✅ Secrets are not freely available on `process.env`, increasing security


## Set up

We'll need two environment variables on Vercel, `DOPPLER_TOKEN` and `SECRETS_KEY`. The rest will be managed in Doppler.

Feel free to add the keys manually, or use the CLIs to do it for you 👇

### Generating `DOPPLER_TOKEN` and `SECRETS_KEY` 

Set up the Doppler and Vercel CLIs

```bash
doppler setup
vercel link
```

Generate a `DOPPLER_TOKEN` for each environment and add to Vercel.

```bash
echo -n "$(doppler configs tokens create vercel-gitops --config dev --plain)" | vercel env add DOPPLER_TOKEN development
echo -n "$(doppler configs tokens create vercel-gitops --config stg --plain)" | vercel env add DOPPLER_TOKEN preview
echo -n "$(doppler configs tokens create vercel-gitops --config prd --plain)" | vercel env add DOPPLER_TOKEN production
```

Generate a `SECRETS_KEY` for each environment and add to Vercel.

```bash
gen_key () { openssl rand -base64 32 }

gen_key | vercel env add SECRETS_KEY development
gen_key | vercel env add SECRETS_KEY preview
gen_key | vercel env add SECRETS_KEY production
```

## Add your other keys in Doppler

For this example, you'll need two keys in Doppler: `NEXT_PUBLIC_KEY` and `SECRET_KEY`.

<img width="665" alt="screenshot-mko9dm3c" src="https://user-images.githubusercontent.com/10865165/175525864-a102b549-71c2-4dd6-ad1b-5e4e6c60e3fb.png">

## Run locally

```
npm run fetch-secrets:local
npm run dev
```

The app should be available at https://localhost:3000


## Run on Vercel

This should work in Vercel because the `build` command in `package.json` runs `npm run fetch-secrets:vercel` before building.