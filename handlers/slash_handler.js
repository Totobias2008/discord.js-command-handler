const { Client, ApplicationCommand } = require('discord.js');
const fs = require('fs');

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
   try {
    client.arrayOfCommands = [];
    let commandcount = 0;
    fs.readdirSync("./Commands").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./Commands/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../Commands/${cmd}/${cmds}`);
        if (pull.options) {
          pull.options
            .filter((g) => g.type === "SUB_COMMAND")
            .forEach((sub) => {
              client.subcmd.set(sub.name, sub);
            });
        }
        if (pull.name) {
          client.commands.set(pull.name, pull);
          commandcount++;
          client.arrayOfCommands.push(pull);
        } else {
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases))
          pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
      try {
        client.on("ready", async () => {
          await client.application.commands
            .set(client.arrayOfCommands)
            .catch((e) => {
              console.log(e.message);
            });
        });
      } catch (e) {
        console.log(e.message);
      }
    });
    console.log(`[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[
      Loaded ${commandcount} Commands
    ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]`);
  } catch (e) {
    console.log(e);
  }
}
