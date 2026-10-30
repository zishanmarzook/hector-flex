# HECTORFLEX official Discord bot setup

The bot is configured for the HECTORFLEX server and its three reputation channels. These are public Discord snowflake identifiers, **not secrets**.

| Purpose | Discord ID |
|---|---|
| Server | `1403735082044227626` |
| Vouches | `1403752243999543356` |
| Reviews | `1403752422601658489` |
| Order proofs | `1403752839167344681` |

## Installation
In the [Discord Developer Portal](https://discord.com/developers/applications), select the **new** bot application, enable **Message Content Intent** on the Bot page, and install it in the server. Allow View Channel, Read Message History and Send Messages in relevant channels. Prefer least-privilege permissions to Administrator.

## Run
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `DISCORD_CLIENT_ID` to the new application's ID.
5. Set `DISCORD_TOKEN` to the new bot token **only in your local .env or hosting secret manager**. Never send, post, or commit it.
6. Run `npm start`.

Use `.ping`, `.help`, `.stats`, and `.proofs` to test. The links for all three proof channels are preconfigured.

## Hosting and next milestones
This Discord Gateway bot needs a continuous process host. GitHub Pages is static and cannot run it. Keep the token in provider environment variables.

**Not implemented yet:** reading/backfilling Discord messages, 318 historical counts, automated website feeds, image rendering, and automatic updates. Future sync should require explicit proof-publication consent, strip personal/customer data, deduplicate messages, respect deletions/edits, and publish only approved content. Channel IDs alone do not grant Discord API access.
