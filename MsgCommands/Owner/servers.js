const { Message, Client, MessageEmbed } = require("discord.js");
const { swap_pages } = require("../../handlers/functions");

module.exports = {
  name: "servers",
  owner: true,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await client.guilds.fetch();

    let guilds = client.guilds.cache.map((g) => g);
    let quelist = [];
    var maxguilds = 10; //guilds / Queue Page
    for (let i = 0; i < guilds.length; i += maxguilds) {
      quelist.push(
        guilds
          .slice(i, i + maxguilds)
          .sort((a, b) => b.memberCount - a.memberCount)
          .map((guild, index) => {
            return `*\`${index + 1}\` [\`${guild.name}\`](${guild.iconURL({
              dynamic: true,
            })}) MemberCount :- \`${guild.memberCount}\` GuildID :- \`${
              guild.id
            }\`*`;
          })
          .join("\n\n")
      );
    }

    let embeds = [];
    for (let i = 0; i < quelist.length; i++) {
      let desc = String(quelist[i]).substr(0, 2048);
      await embeds.push(
        new MessageEmbed()
          .setTitle(
            `Servers of ${client.user.tag} [\`${guilds.length}\`] Servers`
          )
          .setDescription(`${desc || `** There are 0 Guilds **`}`)
          .setFooter({
            text: `${i}/${quelist.length} embeds`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setColor("RANDOM")
      );
    }
    swap_pages(message, embeds);
  },
};
