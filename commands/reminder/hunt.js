const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Reminder = require('../../models/reminderSchema');

module.exports = {
  name: 'hunt',
  description: 'Manage your hunt reminder settings.',
  async execute(message, args, client) {
    const userId = message.author.id;

    // Kullanıcının verisini al veya oluştur
    let data = await Reminder.findOne({ userId });
    if (!data) {
      data = await Reminder.create({ userId });
    }

    const { enabled, respond, autoDelete } = data.hunt;

    // Embed
    const embed = new EmbedBuilder()
      .setTitle('Hunt Reminder Settings')
      .setDescription(
        `Reminder: ${enabled ? '✅ Enabled' : '❌ Disabled'}\n` +
        `Auto Delete: ${autoDelete ? '✅ Enabled' : '❌ Disabled'}\n` +
        `Respond: ${respond ? '✅ Enabled' : '❌ Disabled'}`
      )
      .setColor('#2f3136'); // koyu sade ton

    // Butonlar (renkler duruma göre ayarlanır)
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('toggle_reminder')
        .setLabel('Reminder')
        .setStyle(enabled ? ButtonStyle.Success : ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('toggle_respond')
        .setLabel('Respond')
        .setStyle(respond ? ButtonStyle.Success : ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('toggle_autodelete')
        .setLabel('Auto Delete')
        .setStyle(autoDelete ? ButtonStyle.Success : ButtonStyle.Danger)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
};
