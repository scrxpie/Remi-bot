const GuildSettings = require('../models/guildSettingsSchema');
const Reminder = require('../models/reminderSchema');
const getRandomEmoji = require('../utils/getRandomEmoji');

const REMINDER_COOLDOWN = 15 * 1000;
const userCooldowns = new Map();

async function startHuntReminderForUser(client, userId, channel) {
  const data = await Reminder.findOne({ userId });
  if (!data || !data.hunt.enabled) return;

  const now = Date.now();
  const last = userCooldowns.get(userId) || 0;
  if (now - last < REMINDER_COOLDOWN) return;
  userCooldowns.set(userId, now);

  setTimeout(async () => {
    const updated = await Reminder.findOne({ userId });
    if (!updated || !updated.hunt.enabled) return;

    const guildData = await GuildSettings.findOne({ guildId: channel.guild.id });
    const baseMessage = guildData?.huntReminderMessage || '**Hunt Time**';
    const emoji = getRandomEmoji();

    const content = `${updated.hunt.respond ? `<@${userId}> ` : ''}${baseMessage} ${emoji}`;
    const sent = await channel.send(content);

    if (updated.hunt.autoDelete) {
      setTimeout(() => {
        sent.delete().catch(() => null);
      }, 5000);
    }
  }, REMINDER_COOLDOWN);
}

module.exports = { startHuntReminderForUser };
