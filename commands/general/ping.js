module.exports = {
  name: 'ping',
  description: 'Check the bot\'s response time.',
  async execute(message, args, client) {
    const sent = await message.channel.send('Pinging...');
    const latency = sent.createdTimestamp - message.createdTimestamp;

    sent.edit(`Pong. Latency: ${latency}ms`);
  }
};
