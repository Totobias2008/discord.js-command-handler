const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  owner: true,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const code = args.join(" ");
    if (!code)
      message.reply(
        "How am I supposed to evaluate nothing? PROVIDE CODE IDIOT!"
      );

    try {
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      message
        .reply({
          embeds: [
            new MessageEmbed()
              .setTitle(`Eval Successfully`)
              .setColor("RANDOM")
              .setDescription(`\`\`\`js\n${evaled.substr(0,3000)}\`\`\``)
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true })),
          ],
        })
        .catch((e) => {
          message.reply({
            content: `\`ERROR\` \`\`\`xl\n${e.message}\n\`\`\``,
          });
        });
    } catch (err) {
      message.reply({ content: `\`ERROR\` \`\`\`xl\n${err}\n\`\`\`` });
    }
  },
};
