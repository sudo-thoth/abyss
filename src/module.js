// Description: This file is the main file for the module.
// Import other files here to use them in the module.
// Allowing access to all files in the project.
// This file is required for the module to work.
// DO NOT REMOVE THIS FILE.


// Importing files.

require("dotenv").config({ path: "./my.env" });


const tracker = require("./djs/functions/logs/tracker.js")


// Importing packages.

const fs = require("fs");

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
const {
  google
} = require('googleapis');
const ffmpeg = require('fluent-ffmpeg');
const {
  getLyrics,
  searchSong
} = require('genius-lyrics-api');


const { botToken, mongodb_token } = process.env;

// DJS 
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
  const handleFunctions = require("./djs/client/handlers/handleFunctions.js");
  const handleEvents = require("./djs/client/handlers/handleEvents.js");
  const handleCommands = require("./djs/client/handlers/handleCommands.js");


  // Commands Functions
  const purge = require("./djs/functions/commands/Moderation/purge.js")
  const wipe = require("./djs/functions/commands/Moderation/wipe.js")



  // Import functions

  const sortThenHandleEvents = require("./djs/functions/helpers/internalCode/sortThenHandleEvents.js")
  const isDefined = require("./djs/functions/scripts/isDefined.js")
  const validateUrl = require("./djs/functions/scripts/validateURL.js")
  const log = require("./djs/functions/scripts/log.js")
  const isColor = require("./djs/functions/scripts/isColor.js")
  const lessCharsThan = require("./djs/functions/scripts/lessCharsThan.js")
  const buildButton = require("./djs/functions/helpers/djsBuilders/buildButton.js")
  const buildRow = require("./djs/functions/helpers/djsBuilders/buildRow.js")
  const argName = require("./djs/functions/scripts/argName.js")

// Exporting files.

module.exports = {
    tracker: tracker,
    fs: fs,
    botToken: botToken,
    mongodb_token: mongodb_token,
    Client: Client,
    GatewayIntentBits: GatewayIntentBits,
    EmbedBuilder: EmbedBuilder,
    PermissionsBitField: PermissionsBitField,
    Permissions: Permissions,
    MessageManager: MessageManager,
    Embed: Embed,
    Collection: Collection,
    mongoose: mongoose,
    handleFunctions: handleFunctions,
    handleEvents: handleEvents,
    handleCommands: handleCommands,
    client: client,
    sortThenHandleEvents: sortThenHandleEvents,
    isDefined: isDefined,
    validateUrl: validateUrl,
    log: log,
    isColor: isColor,
    purge: purge,
    wipe: wipe,
    lessCharsThan: lessCharsThan,
    buildButton: buildButton,
    buildRow: buildRow,
    argName: argName,
    
    


}