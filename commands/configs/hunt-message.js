const GuildSettings = require('../../models/guildSettingsSchema');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'hunt-message',
  description: 'Sets the custom hunt reminder message for this server.',
  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ You need **Administrator** permission to use this command.');
    }

    const guildId = message.guild.id;
    const newMessage = args.join(' ');

    if (!newMessage) {
      return message.reply('❌ Please provide a reminder message. Example:\n`r?set-reminder-message Time to hunt!`');
    }

    let data = await GuildSettings.findOne({ guildId });
    if (!data) {
      data = new GuildSettings({ guildId });
    }

    data.huntReminderMessage = newMessage;
    await data.save();

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#2f3136')
          .setTitle('🔔 Reminder Message Updated')
          .setDescription(`New reminder message:\n\`${newMessage}\``)
      ]
    });
  }
};
