import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits,
} from "discord.js";

const required = ["DISCORD_TOKEN", "DISCORD_CLIENT_ID", "DISCORD_GUILD_ID"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing ${key}. See .env.example`);
    process.exit(1);
  }
}
const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
  VOUCH_CHANNEL_ID,
  ORDER_PROOF_CHANNEL_ID,
} = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Check whether HECTORFLEX is online"),
  new SlashCommandBuilder().setName("help").setDescription("Show HECTORFLEX bot commands"),
  new SlashCommandBuilder().setName("stats").setDescription("Show configured proof channel status"),
  new SlashCommandBuilder()
    .setName("proofs")
    .setDescription("Get the links to HECTORFLEX proof channels"),
];

const channelLink = (id) => id ? `https://discord.com/channels/${DISCORD_GUILD_ID}/${id}` : null;
const safeReply = async (interaction, content) => {
  await interaction.reply({ content, flags: MessageFlags.Ephemeral });
};

client.on("ready", () => {
  console.log(`HECTORFLEX online as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.guildId !== DISCORD_GUILD_ID) return;
  try {
    switch (interaction.commandName) {
      case "ping":
        return await safeReply(interaction, "🏓 HECTORFLEX is online!");
      case "help":
        return await safeReply(interaction, "🤖 **HECTORFLEX Official Bot**\n/ping — check status\n/stats — channel configuration\n/proofs — vouch and order-proof links\n\nMore store features are coming soon.");
      case "stats":
        return await safeReply(interaction, `📊 **Proof channels**\n💬 Vouches: ${VOUCH_CHANNEL_ID ? "Configured" : "Not configured"}\n📦 Order proofs: ${ORDER_PROOF_CHANNEL_ID ? "Configured" : "Not configured"}\n\nHistorical counts are not synced yet. No fake totals displayed.`);
      case "proofs": {
        const v = channelLink(VOUCH_CHANNEL_ID);
        const p = channelLink(ORDER_PROOF_CHANNEL_ID);
        return await safeReply(interaction, `💬 Vouches: ${v || "Not configured"}\n📦 Order proofs: ${p || "Not configured"}`);
      }
      default:
        return;
    }
  } catch (error) {
    console.error("Command error:", error);
    if (!interaction.replied && !interaction.deferred) {
      await safeReply(interaction, "Something went wrong. Please try again.");
    }
  }
});

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
  body: commands.map((command) => command.toJSON()),
});
console.log("Registered guild slash commands.");
await client.login(DISCORD_TOKEN);
