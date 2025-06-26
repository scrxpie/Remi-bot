const Reminder = require('../models/reminderSchema');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const userId = interaction.user.id;

    let data = await Reminder.findOne({ userId });
    if (!data) {
      data = await Reminder.create({ userId });
    }

    const hunt = data.hunt;

    // Butona göre işlem yap
    switch (interaction.customId) {
      case 'toggle_reminder':
        hunt.enabled = !hunt.enabled;
        break;

      case 'toggle_respond':
        hunt.respond = !hunt.respond;
        break;

      case 'toggle_autodelete':
        hunt.autoDelete = !hunt.autoDelete;
        break;

      default:
        return;
    }

    await data.save();

    // Yeni embed
    const newEmbed = new EmbedBuilder()
      .setTitle('Hunt Reminder Settings')
      .setDescription(
        `Reminder: ${hunt.enabled ? '✅ Enabled' : '❌ Disabled'}\n` +
        `Auto Delete: ${hunt.autoDelete ? '✅ Enabled' : '❌ Disabled'}\n` +
        `Respond: ${hunt.respond ? '✅ Enabled' : '❌ Disabled'}`
      )
      .setColor('#2f3136');

    // Yeni butonlar
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('toggle_reminder')
        .setLabel('Reminder')
        .setStyle(hunt.enabled ? ButtonStyle.Success : ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('toggle_respond')
        .setLabel('Respond')
        .setStyle(hunt.respond ? ButtonStyle.Success : ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('toggle_autodelete')
        .setLabel('Auto Delete')
        .setStyle(hunt.autoDelete ? ButtonStyle.Success : ButtonStyle.Danger)
    );

    // Mesajı düzenle
    await interaction.update({
      embeds: [newEmbed],
      components: [row]
    });
  }
};
