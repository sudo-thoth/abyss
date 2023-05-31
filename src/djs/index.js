require("dotenv").config({ path: "./my.env" });
const fs = require("fs");
const { token, mongodb_token } = process.env;
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Embed,
  Collection,
} = require(`discord.js`);
const mongoose = require("mongoose");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    4, // GuildModeration
  ],
  partials: [
    "User",
    "GuildMember",
    "Channel",
    "Message",
    "Reaction",
    "Presence",
  ],
});
const handleFunctions = require("./client/handlers/handleFunctions");
const handleEvents = require("./client/handlers/handleEvents");
const handleCommands = require("./client/handlers/handleCommands");
const djsFunctionFolders = fs.readdirSync("./src/djs/functions");
const djsCommandFolders = fs.readdirSync("./src/djs/commands");
const djsEventFiles = fs.readdirSync("./src/djs/client/events")
  .filter((file) => file.endsWith(".js"));
const mongoConfig = fs.readdirSync("./src/db/MongoDB/config")
  .filter((file) => file.endsWith(".js"));
const sortThenHandleEvents = async (client, eventFiles, num) => {
  console.log(`the number is ${num}`);
  switch (num) {
    case 1:
      handleEvents(client, '../events', eventFiles, '');
      console.log(`Handle Events: ✅`);
      break;
    case 2:
      handleEvents(client, '../../../db/MongoDB/config', eventFiles, '');
      console.log(`Handle Events: ✅`);
      break;
    default:
      console.log(`Handle Events: ❌`);
      break;
  }
};
// handle events in the djs/client/events folder
sortThenHandleEvents(client, djsEventFiles, 1);
// handle events in the db/MongoDB/config folder
sortThenHandleEvents(client, mongoConfig, 2);
// handle functions in the djs/functions folder
handleFunctions(djsFunctionFolders, "./src/djs/functions");
// handle events in the djs/events folder
handleEvents(client, "./src/djs/events",  )

// attempt to connect to MongoDB and handle commands then login
(async () => {
  if (mongoose === undefined) {
    return;
  } else {
    try {
      mongoose.connect(mongodb_token);
      console.log(`---------- >> MongoDB is Online << ----------`);
      client.connectedToMongoose = true;
    } catch (error) {
      client.connectedToMongoose = false;
      console.error;
    } finally {
      handleCommands(client, djsCommandFolders, "./src/djs/commands").then(
        client.login(token)
      );
    }
  }
})();

module.exports = client;
