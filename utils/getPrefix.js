const Prefix = require('../models/prefixSchema');

module.exports = async function getPrefix(guildId) {
  const data = await Prefix.findOne({ guildId });
  return data?.prefix || process.env.DEFAULT_PREFIX || "r.";
}
