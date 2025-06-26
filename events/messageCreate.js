const getPrefix = require('../utils/getPrefix');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    const prefix = await getPrefix(message.guild.id);
    if (!message.content.startsWith(prefix)) return;

    // Remove prefix (with or without space)
    const sliced = message.content.slice(prefix.length).trimStart(); // handles `r?ping` and `r? ping`
    const args = sliced.split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply("❌ An error occurred while executing the command.");
    }
  }
};
