# next-env-encrypt-decrypt

This is an example repository for how to work around Vercel's 4kb restriction in a Nextjs project using an external secrets provider. We are using [Doppler](https://doppler.com/) here, but you could use whatever you want.

## Quick start

Set up Doppler and Vercel

```bash
doppler setup
vercel link
```

Add the `DOPPLER_TOKEN` to the Vercel environment manager.

```bash
echo -n "$(doppler configs tokens create vercel-gitops --config dev --plain)" | vercel env add DOPPLER_TOKEN development
echo -n "$(doppler configs tokens create vercel-gitops --config stg --plain)" | vercel env add DOPPLER_TOKEN preview
echo -n "$(doppler configs tokens create vercel-gitops --config prd --plain)" | vercel env add DOPPLER_TOKEN production
```

In this example, you'll need two keys in Doppler: `NEXT_PUBLIC_KEY` and `SECRET_KEY`.

<img width="665" alt="screenshot-mko9dm3c" src="https://user-images.githubusercontent.com/10865165/175525864-a102b549-71c2-4dd6-ad1b-5e4e6c60e3fb.png">

## Alternative 1: Without encryption

Run `vercel env pull` to get the `DOPPLER_TOKEN` to `.env`.

Run `npm run fetch-secrets` to fetch the other secrets to `.env`

Then run

```
npm run dev
```

And load https://localhost:3000

## Alternative 2: With encryption

Add some extra security by encrypting the values at rest. This prevents the need to have secrets in `env` and in `process.env`.

We need to add an extra key to the Vercel environment manager.

```
gen_key () { openssl rand -base64 32 }

gen_key | vercel env add GITOPS_SECRETS_MASTER_KEY development
gen_key | vercel env add GITOPS_SECRETS_MASTER_KEY preview
gen_key | vercel env add GITOPS_SECRETS_MASTER_KEY production
```

Run `vercel env pull`

Run `npm run fetch-encrypt-secrets` to populate `secrets.gen.ts` with encrypted secrets.

Then run

```
npm run dev
```

And load https://localhost:3000
