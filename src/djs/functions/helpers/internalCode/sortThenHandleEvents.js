const eventsFolderPath = "../../../../djs/client/events";
const mongoDBConfigFolderPath = "../../../../db/MongoDB/config";

module.exports = async function sortThenHandleEvents(client, eventFiles, num){
    console.log(`the number is ${num}`);
    switch (num) {
      case 1:
        handleEvents(client, eventsFolderPath, eventFiles, '');
        console.log(`Handle DJS Events: ✅`);
        break;
      case 2:
        handleEvents(client, mongoDBConfigFolderPath, eventFiles, '');
        console.log(`Handle MongoDB Events: ✅`);
        break;
      default:
        console.log(`Handle Events: ❌`);
        break;
    }
  };