# Deploy HECTORFLEX official bot

The new Discord application ID is `1565760164638756935`. Server and three channel IDs are already configured as defaults in `.env.example`.

## Option: Railway persistent worker

1. Open [Railway](https://railway.com/) and sign in with GitHub.
2. Create a new project and select **Deploy from GitHub repo** → `zishanmarzook/hector-flex`.
3. Use the repository's Dockerfile to build. The Dockerfile runs `npm start` as a continuous background Discord Gateway process.
4. In the Railway service's **Variables** tab, add only this required secret: `DISCORD_TOKEN` = token copied from the **new** HECTORFLEX application Bot page in Discord Developer Portal. **Never paste it into ChatGPT, GitHub files, screenshots, or chat messages.**
5. The other ID variables are already supplied as defaults in code; optionally define `DISCORD_CLIENT_ID`, `DISCORD_GUILD_ID`, `VOUCH_CHANNEL_ID`, `REVIEW_CHANNEL_ID`, and `ORDER_PROOF_CHANNEL_ID` using values in `.env.example`.
6. Deploy, open service logs and look for **Registered guild slash commands** and **HECTORFLEX online as ...**.
7. In your server, test `/ping`, `/help`, `/stats` and `/proofs`.

The hosting provider may have billing requirements or changing free-tier limits. A sleeping web host is **not** appropriate for a continuously connected Discord Gateway bot. No public HTTP domain is needed for this version.

## Discord install

Open [Discord Developer Portal](https://discord.com/developers/applications), select application `1565760164638756935`, and install it into server `1403735082044227626` using Guild Install with `bot` and `applications.commands` scopes. Give it View Channels and Send Messages where appropriate. Do not grant Administrator unnecessarily.

## Current functionality

Slash commands show bot status and proof-channel links. The bot **does not yet read, count, export or sync Discord messages**. Automatic approved-proof syncing and the portfolio backend remain separate future implementation steps. Only publish testimonials and screenshots with permission and with private data removed.
