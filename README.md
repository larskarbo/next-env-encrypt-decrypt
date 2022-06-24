This is an example repository for how to use `gitops-secret` in a Nextjs project.

Set up doppler and vercel

```
doppler setup
vercel link
```

Add the DOPPLER_TOKEN to the Vercel environment manager.

```
echo -n "$(doppler configs tokens create vercel-gitops --config dev --plain)" | vercel env add DOPPLER_TOKEN development

echo -n "$(doppler configs tokens create vercel-gitops --config stg --plain)" | vercel env add DOPPLER_TOKEN preview

echo -n "$(doppler configs tokens create vercel-gitops --config prd --plain)" | vercel env add DOPPLER_TOKEN production
```

Add `NEXT_PUBLIC_KEY` and `SECRET_KEY` to Doppler.

## Alternative 1: Without encryption

Run `vercel env pull` to get the `DOPPLER_TOKEN` to `.env`.

Run `npm run fetch-secrets` to fetch the other secrets to `.env`

Then run

```
npm run dev
```

And load https://localhost:3000


## Alternative 2: With encryption