const Prefix = require('../models/prefixSchema');

module.exports = {
  name: 'prefix',
  description: 'Allows you to change the bot\'s prefix. Admins only.',
  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply("🚫 You need the `Administrator` permission to use this command.");
    }

    const newPrefix = args[0];
    if (!newPrefix) {
      return message.reply("❗ Please provide a new prefix. Example: `r? prefix !`");
    }

    if (newPrefix.length > 5) {
      return message.reply("⚠️ The prefix can’t be longer than 5 characters.");
    }

    await Prefix.findOneAndUpdate(
      { guildId: message.guild.id },
      { prefix: newPrefix },
      { upsert: true }
    );

    message.channel.send(`✅ Prefix has been successfully set to \`${newPrefix}\`.`);
  }
};
