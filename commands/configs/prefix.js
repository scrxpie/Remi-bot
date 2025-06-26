const { EmbedBuilder } = require('discord.js');
const { getPrefix, savePrefix } = require('../../utils/prefixUtils');

module.exports = {
  name: 'prefix',
  description: 'Set or view the current server prefix.',
  async execute(message, args, client) {
    // Check for admin permission
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ You need **Administrator** permission to use this command.');
    }

    const guildId = message.guild.id;

    // Show current prefix
    if (!args[0]) {
      const currentPrefix = await getPrefix(guildId);
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle('🔧 Current Prefix')
            .setDescription(`This server's prefix is: \`${currentPrefix}\``)
        ]
      });
    }

    // Set new prefix
    const newPrefix = args[0];

    if (newPrefix.length > 5) {
      return message.reply('❌ Prefix cannot be longer than 5 characters.');
    }

    await savePrefix(guildId, newPrefix);

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#2f3136')
          .setTitle('✅ Prefix Updated')
          .setDescription(`New prefix is: \`${newPrefix}\``)
      ]
    });
  }
};
