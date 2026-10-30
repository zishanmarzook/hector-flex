# Run HECTORFLEX on Windows for free

1. Install [Node.js LTS](https://nodejs.org/) once (includes npm).
2. On GitHub, use **Code → Download ZIP** on the repository's main branch. Extract it to a folder (do not run from inside the ZIP).
3. Double-click **START-HECTORFLEX.bat**.
4. On the first launch, you'll be asked for the **new HECTORFLEX Discord bot token**. Copy it from the [Discord Developer Portal](https://discord.com/developers/applications) → new application → Bot. Paste into the black setup window. The input is hidden and saved **only to your PC** in a local `.env` file, which Git excludes.
5. The launcher installs Node dependencies and runs the bot. Keep its black window open while you want the bot online.
6. In Discord, test `/ping`, `/stats`, and `/proofs`.

**Troubleshooting:** If the bot isn't in your Discord server yet, install it with Guild Install scopes `bot` and `applications.commands`. If it says *An invalid token was provided*, delete the local `.env` file and run the launcher again to re-enter a newly generated token. Do not share the token in chat or screenshots.

This runs the slash-command bot only while your computer is on and the launcher window stays open. It **does not yet sync Discord channel messages to your portfolio**, and the displayed 318 count has not been independently imported.

**Security:** The token is a secret. The local `.env` file is plain text after setup: keep the bot folder private. Never upload the entire extracted directory (with `.env`) to public repositories or file-sharing services.
