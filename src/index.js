import "dotenv/config";
import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, MessageFlags } from "discord.js";

const config = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID || "1565760164638756935",
  guildId: process.env.DISCORD_GUILD_ID || "1403735082044227626",
  channels: {
    vouches: process.env.VOUCH_CHANNEL_ID || "1403752243999543356",
    reviews: process.env.REVIEW_CHANNEL_ID || "1403752422601658489",
    orderProofs: process.env.ORDER_PROOF_CHANNEL_ID || "1403752839167344681",
  },
};

if (!config.token || !config.clientId) {
  console.error("Missing DISCORD_TOKEN or DISCORD_CLIENT_ID. See .env.example");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Check whether HECTORFLEX is online"),
  new SlashCommandBuilder().setName("help").setDescription("Show HECTORFLEX bot commands"),
  new SlashCommandBuilder().setName("stats").setDescription("Show proof channel configuration status"),
  new SlashCommandBuilder().setName("proofs").setDescription("Get links to HECTORFLEX vouches, reviews, and order proofs"),
];

const channelLink = (id) => `https://discord.com/channels/${config.guildId}/${id}`;
const proofEntries = [
  ["🤝 Vouches", config.channels.vouches],
  ["⭐ Reviews", config.channels.reviews],
  ["📦 Order proofs", config.channels.orderProofs],
];

client.once("ready", () => console.log(`HECTORFLEX online as ${client.user.tag}`));

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.guildId !== config.guildId) return;
  try {
    let content;
    switch (interaction.commandName) {
      case "ping":
        content = "🏓 HECTORFLEX is online!";
        break;
      case "help":
        content = "🤖 **HECTORFLEX Official Bot**\n/ping — check status\n/stats — channel setup\n/proofs — vouch, review, and order-proof links\n\nAutomatic proof syncing is not enabled yet.";
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
    await interaction.reply({ content, flags: MessageFlags.Ephemeral });
  } catch (error) {
    console.error("Command error:", error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: "Something went wrong. Please try again.", flags: MessageFlags.Ephemeral }).catch(console.error);
    }
  }
});

const rest = new REST({ version: "10" }).setToken(config.token);
await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
  body: commands.map((command) => command.toJSON()),
});
console.log("Registered guild slash commands.");
await client.login(config.token);
