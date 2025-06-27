const Reminder = require('../models/reminderSchema');
const getRandomEmoji = require('../utils/getRandomEmoji');

const REMINDER_COOLDOWN = 15 * 1000; // 15 saniye

const userCooldowns = new Map();

async function startHuntReminderForUser(client, userId, channel) {
  const data = await Reminder.findOne({ userId });
  if (!data || !data.hunt.enabled) return;

  const now = Date.now();
  const last = userCooldowns.get(userId) || 0;

  if (now - last < REMINDER_COOLDOWN) return;

  userCooldowns.set(userId, now);

  setTimeout(async () => {
    const emoji = getRandomEmoji();
    const updated = await Reminder.findOne({ userId });
    if (!updated || !updated.hunt.enabled) return;

    const messageContent = `${updated.hunt.respond ? `<@${userId}> ` : ''}Hunt Time ${emoji}`;

    const sent = await channel.send(messageContent);

    if (updated.hunt.autoDelete) {
      setTimeout(() => {
        sent.delete().catch(() => null);
      }, 5000); // 5 saniye sonra sil
    }

  }, REMINDER_COOLDOWN);
}

module.exports = { startHuntReminderForUser };
