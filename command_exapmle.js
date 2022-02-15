const { Command } = require("../../utils/command/command");
const ee = require("../../settings/config").embed
const config = require("../../settings/config")

module.exports = new Command({
  // options
  name: "",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
  },
});
