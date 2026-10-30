import "dotenv/config";
import https from "node:https";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { ProxyAgent, setGlobalDispatcher } from "undici";

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
if (proxyUrl) {
  setGlobalDispatcher(new ProxyAgent(proxyUrl));

  const gatewayAgent = new HttpsProxyAgent(proxyUrl);
  const request = https.request;
  https.request = function proxyDiscordGateway(options, ...args) {
    const hostname = options?.hostname || options?.host;
    if (hostname === "gateway.discord.gg" && !options.agent) {
      options = { ...options, agent: gatewayAgent };
    }
    return request.call(this, options, ...args);
  };
}

const config = {
  token: process.env.DISCORD_TOKEN,
  guildId: process.env.DISCORD_GUILD_ID || "1403735082044227626",
  channels: {
    vouches: process.env.VOUCH_CHANNEL_ID || "1403752243999543356",
    reviews: process.env.REVIEW_CHANNEL_ID || "1403752422601658489",
    orderProofs: process.env.ORDER_PROOF_CHANNEL_ID || "1403752839167344681",
  },
};

if (!config.token) {
  console.error("Missing DISCORD_TOKEN. See .env.example");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const channelLink = (id) => `https://discord.com/channels/${config.guildId}/${id}`;
const proofEntries = [
  ["🤝 Vouches", config.channels.vouches],
  ["⭐ Reviews", config.channels.reviews],
  ["📦 Order proofs", config.channels.orderProofs],
];

client.once(Events.ClientReady, (readyClient) => console.log(`HECTORFLEX online as ${readyClient.user.tag}`));

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || message.guildId !== config.guildId || !message.content.startsWith(".")) return;

  const command = message.content.slice(1).trim().split(/\s+/)[0].toLowerCase();
  try {
    let content;
    switch (command) {
      case "ping":
        content = "🏓 HECTORFLEX is online!";
        break;
      case "help":
        content = "🤖 **HECTORFLEX Official Bot**\n.ping — check status\n.stats — channel setup\n.proofs — vouch, review, and order-proof links\n\nAutomatic proof syncing is not enabled yet.";
        break;
      case "stats":
        content = "📊 **Configured channels**\n" + proofEntries.map(([label, id]) => `${label}: ${id ? "Configured" : "Missing"}`).join("\n") + "\n\nHistorical counts are not synced yet.";
        break;
      case "proofs":
        content = "🔗 **HECTORFLEX Proof Channels**\n" + proofEntries.map(([label, id]) => `${label}: ${channelLink(id)}`).join("\n");
        break;
      default:
        return;
    }
    await message.reply(content);
  } catch (error) {
    console.error("Command error:", error);
    await message.reply("Something went wrong. Please try again.").catch(console.error);
  }
});

await client.login(config.token);
