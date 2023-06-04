// This is the main file for the discord.js bot.
// module.js is the Everything file. It's the file that contains all the modules and exports them.
const x = require("../module.js")
const { fs, botToken, mongodb_token, mongoose, handleFunctions, handleEvents, handleCommands, client, sortThenHandleEvents } = x


//Changes 


// handle functions in the djs/functions folder
const djsFunctionFolders = fs.readdirSync("./src/djs/functions");
const djsCommandFolders = fs.readdirSync("./src/djs/commands");
const djsEventFiles = fs.readdirSync("./src/djs/client/events")
  .filter((file) => file.endsWith(".js"));
const mongoConfig = fs.readdirSync("./src/db/MongoDB/config")
  .filter((file) => file.endsWith(".js"));

const eventsFolderPath = "./src/djs/events";
const functionsFolderPath = "./src/djs/functions";
const commandsFolderPath = "./src/djs/commands";


// handle events in the djs/client/events folder
sortThenHandleEvents(client, djsEventFiles, 1);
// handle events in the db/MongoDB/config folder
sortThenHandleEvents(client, mongoConfig, 2);
// handle functions in the djs/functions folder
handleFunctions(djsFunctionFolders,functionsFolderPath);
// handle events in the djs/events folder
handleEvents(client, eventsFolderPath)

// attempt to connect to MongoDB and handle commands then login
(async () => {
  if (mongoose === undefined) {
    return;
  } else {
    try {
      // Connect to MongoDB
      mongoose.connect(mongodb_token);
      console.log(`----------✅ >> MongoDB is Online << ✅----------`);
      client.connectedToMongoose = true;
    } catch (error) {
      client.connectedToMongoose = false;
      console.log(`----------❌ >> MongoDB is Offline << ❌----------`);
      console.error;
    } finally {
      // handle commands in the djs/commands folder
      handleCommands(client, djsCommandFolders, commandsFolderPath).then(
        // Log the Bot Client in.
        client.login(botToken)
      );
    }
  }
})();

module.exports = client;
