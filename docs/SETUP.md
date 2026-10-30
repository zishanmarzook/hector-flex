# HECTORFLEX bot setup

## 1. Discord Developer Portal
Open https://discord.com/developers/applications and select the **new** HECTORFLEX application.
In **Installation**, add the `bot` and `applications.commands` scopes for Guild Install.
Install into your HECTORFLEX server, allowing **View Channels**, **Send Messages**, and **Read Message History** in proof channels. Do not grant Administrator.

## 2. IDs and token (do not share the token)
In Discord Settings > Advanced, enable Developer Mode. Right-click the server and proof channels to copy IDs.
On your own computer, copy `.env.example` to `.env` and fill in:
- `DISCORD_TOKEN` — from the Developer Portal Bot page; secret, never share or commit
- `DISCORD_CLIENT_ID` — application ID
- `DISCORD_GUILD_ID` — server ID
- `VOUCH_CHANNEL_ID` — vouch channel ID
- `ORDER_PROOF_CHANNEL_ID` — order-proof channel ID

## 3. Run the bot
Install Node.js 20+ and run:
```bash
npm install
npm start
```
Commands register to your server on startup. Try `/ping`, `/help`, `/stats`, `/proofs`.

## 4. Host continuously
This is a persistent Discord Gateway bot: use a long-running Node.js worker/container service. GitHub Pages only serves the portfolio; it cannot host this bot. Configure environment variables in the hosting provider's secret manager.

## Planned proof synchronization
The initial bot **does not** publish messages or count channel posts. Next, implement permission-scoped backfill, approved-public proof records, redact personal data and transaction details, deduplicate and respect message deletions, then expose a read-only website feed. Do not automatically publish every private Discord message or image. Consent and privacy review come first.
