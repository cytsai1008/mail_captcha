# reCAPTCHA v3 Mailto Verification

Protects a `mailto:` link from bots using Google reCAPTCHA v3, deployed as a Cloudflare Worker with static asset serving.

## How it Works

1. User visits the page — reCAPTCHA v3 runs invisibly in the background.
2. A token is sent to the `/verify` endpoint on the Worker.
3. The Worker verifies the token with Google's API using the secret key (never exposed to the client).
4. On success, the Worker returns the email address and the user is redirected to the `mailto:` link.
5. On failure, the user is redirected to a failure page.

## Project Structure

```
├── src/
│   └── index.js        # Cloudflare Worker (handles /verify and /health)
├── public/
│   ├── index.html      # Verification page
│   ├── failed.html     # Failure page
│   ├── script.js       # reCAPTCHA logic + fetch to /verify
│   └── style.css       # Styles (light/dark mode via CSS media query)
├── wrangler.toml       # Cloudflare Workers config
└── package.json
```

## Setup

### 1. reCAPTCHA v3 Keys

- Go to the [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin/).
- Register a new site, choose **reCAPTCHA v3**, and add your domain.
- Copy the **site key** and **secret key**.
- Set the site key in `public/index.html` (the `?render=` query param on the reCAPTCHA script tag).

### 2. Secrets

Set the required secrets via the Wrangler CLI:

```bash
wrangler secret put RECAPTCHA_SECRET_KEY
wrangler secret put MAIL_TO_EMAIL
```

## Development

```bash
npm install
npm run dev     # wrangler dev — runs Worker locally at http://localhost:8787
```

## Deployment

```bash
npm run deploy  # wrangler deploy
```

The Worker is automatically deployed via Cloudflare's Git integration on every push to `main`.
