const scripts = require("../../../functions/scripts/scripts.js");
const mongoose = require("mongoose");


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
          client.on("ready", () => {
            console.log("---------- >> Bot is Online << ----------");
          
            const activities = [
              "with my code",
              "Juice WRLD - Road Rage",
              "Juice WRLD - In My Head",
              "Juice WRLD - Amazing",
              "Juice WRLD - Ca$h Out",
              "Juice WRLD - Nuts Itch",
            ];
          
            const types = ["PLAYING", "LISTENING", "WATCHING", "STREAMING", "COMPETING"];
          
            const statuses = ["online", "idle", "dnd", "invisible"];
          
            setInterval(() => {
              const text = activities[Math.floor(Math.random() * activities.length)];
              const type = types[Math.floor(Math.random() * types.length)];
              const status = statuses[Math.floor(Math.random() * statuses.length)];
          
              // client.user.setPresence({activities : [{name: text, type: type}], status: status});
              client.user.setPresence({ activities: [{ name: text }], status: status });
              client.user.setAct;
            }, 5000);
          });

        console.log(`Ready! ✅`)
    },
};