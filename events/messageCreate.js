const getPrefix = require('../utils/getPrefix');
const { saveGuildPrefix } = require('../utils/prefixUtils');
const { startHuntReminderForUser } = require('../handlers/reminderHandler');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    const content = message.content.toLowerCase().replace(/\s+/g, ' ').trim();

    // 🔧 Prefix değiştirme mesajını algıla (owo bot)
    if (content.includes('you successfully changed my server prefix to')) {
      const prefixMatch = content.match(/prefix to \*\*`(.+?)`\*\*/);
      if (prefixMatch) {
        const newPrefix = prefixMatch[1];
        await saveGuildPrefix(message.guild.id, newPrefix);
        console.log(`Prefix ${newPrefix} olarak kaydedildi.`);
      }
    }

    // ✅ Owo/w hunt mesajı veya owh/wh kısaltması kontrolü
    const owoPrefixes = ['owo', 'w'];
    const isOwoHunt = owoPrefixes.some(p => content === `${p} hunt` || content === `${p}h`);

    if (isOwoHunt) {
      startHuntReminderForUser(client, message.author.id, message.channel);
    }

    // ✅ Normal bot komutlarını çalıştır
    const prefix = await getPrefix(message.guild.id);
    if (!message.content.startsWith(prefix)) return;

    const sliced = message.content.slice(prefix.length).trimStart();
    const args = sliced.split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply("❌ An error occurred while executing the command.");
    }
  }
};
