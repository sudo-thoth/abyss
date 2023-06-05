

module.exports = async function purge(interaction){
    const { channel, options } = interaction;
    const type = options.getSubcommand();
    const amount = options.getInteger("num");
    const target = options.getUser("target");
try{
    await interaction.deferReply({ephemeral:true})
} catch(error){
console.log(`Failed to defer reply:`, error);
return;
}
    if (amount > 100) {
      const errEmbed = new EmbedBuilder()
        .setDescription(`You can only purge up to 100 messages at a time.`)
        .setColor(0xc72c3b);
      console.log(`Purge Command Failed to Execute: ❌`);
      return interaction.editReply({ embeds: [errEmbed] });
    }

    let messages;

    try {
      messages = await channel.messages.fetch({
        limit: amount < 100 ? amount + 1 : 100,
      });
    } catch (error) {
      console.error(`Failed Fetch Attempt`, error);
    }

    const res = new EmbedBuilder().setColor(0x5fb041);

    if (type === "a-users-messages") {
      let i = 0;
      const filtered = [];

      try {
        (await messages)?.filter((msg) => { // fix error here with filter trying to run on undefined
          if (msg.author.id === target.id && amount > i) {
            filtered.push(msg);
            i++;
          }
        });
      } catch (error) {
        console.error(`Failed Filter Attempt`, error);
      }

      try {
        await channel.bulkDelete(filtered).then((messages) => {
          res.setDescription(
            `:white_check_mark: Successfully deleted ${
              amount != 1 ? `${amount} messages` : `${amount} message`
            } from ${target}.`
          );
          interaction.editReply({  embeds: [res] });
          console.log(`Purge Command Executed Successfully: ✅`);
        });
      } catch (error) {
        console.error(`Failed Bulk Delete Attempt`, error);
      }
    } else if (type === "num-of-messages") {
      try {
        await channel.bulkDelete(amount, true).then((messages) => {
          res.setDescription(
            `:white_check_mark: Successfully deleted ${messages.size} messages from the channel.`
          );
          interaction.editReply({  embeds: [res] });
          console.log(`Purge Command Executed Successfully: ✅`);
        });
      } catch (error) {
        console.error(`Failed Bulk Delete Attempt`, error);
      }
    }
    console.log(`Purge Command Complete: ✅`);
  }