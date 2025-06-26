const Reminder = require('../models/reminderSchema');
const getRandomEmoji = require('../utils/getRandomEmoji');

async function startHuntReminderForUser(client, userId, channel) {
  let userData = await Reminder.findOne({ userId });
  if (!userData) {
    userData = await Reminder.create({ userId });
  }

  if (!userData.hunt.enabled) {
    userData.hunt.enabled = true;
    await userData.save();
  }

  setTimeout(async () => {
    let msg = userData.hunt.message || "Hunt Time";
    msg += ' ' + getRandomEmoji();

    channel.send({ content: msg });
  }, 15000);
}

module.exports = { startHuntReminderForUser };
