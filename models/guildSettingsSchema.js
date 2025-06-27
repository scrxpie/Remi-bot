const mongoose = require('mongoose');

const guildSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  huntReminderMessage: { type: String, default: null }
});

module.exports = mongoose.model('GuildSettings', guildSettingsSchema);
