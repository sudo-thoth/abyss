const x = require("../../../module.js")
const { SlashCommandBuilder,
  PermissionFlagsBits,purge } = x


module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription(
      "Purge a specific amount of messages from a target or channel."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("num-of-messages")
        .setDescription("Purge a specific number of messages.")
        .addIntegerOption((option) =>
          option
            .setName("num")
            .setDescription("Amount of messages to purge.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("a-users-messages")
        .setDescription("Purge messages from a specific user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Select a user to purge their messages.")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("num")
            .setDescription("Amount of messages to purge.")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    purge(interaction);
  }};
