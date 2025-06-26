const Prefix = require('../models/prefixSchema');

const DEFAULT_PREFIX = process.env.DEFAULT_PREFIX || 'r.';

// Prefix alma
async function getPrefix(guildId) {
  const data = await Prefix.findOne({ guildId });
  return data?.prefix || DEFAULT_PREFIX;
}

// Prefix kaydetme
async function savePrefix(guildId, newPrefix) {
  let data = await Prefix.findOne({ guildId });
  if (!data) {
    data = new Prefix({ guildId, prefix: newPrefix });
  } else {
    data.prefix = newPrefix;
  }

  await data.save();
  return newPrefix;
}

module.exports = {
  getPrefix,
  savePrefix,
  DEFAULT_PREFIX
};
