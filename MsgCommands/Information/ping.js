const { Message, Client } = require("discord.js");

module.exports = {
  name: "ping",
  owner: true,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      message.reply(`pong`)
  },
};
