const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
  try {
    fs.readdirSync("./MsgCommands").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./MsgCommands/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../MsgCommands/${cmd}/${cmds}`);
        if (pull.name) {
          client.mcommands.set(pull.name, pull);
        } else {
          console.log(`${cmds} Command is not Ready`);
          continue;
        }
      }
    });
    console.log(`${client.mcommands.size} Message Commands Loaded`);
  } catch (e) {
    console.log(e);
  }
};
