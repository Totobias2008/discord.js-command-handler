const client = require("..");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  let prefix = "!";
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  let mentionprefix = new RegExp(
    `^(<@!?${client.user?.id}>|${mentionprefixnew(prefix)})`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, nprefix] = message.content.match(mentionprefix);
  if (nprefix.includes(client.user.id)) {
    message.reply(`**To See My All Commans Type **\`/help\``);
  }
  const args = message.content.slice(nprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command = client.mcommands.get(cmd);
  if (command) {
    if (message.author.id !== "882481863661342770") {
      return message.reply(`Only For Owner`);
    } else {
      await command.run(client, message, args);
    }
  }
});

function mentionprefixnew(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
