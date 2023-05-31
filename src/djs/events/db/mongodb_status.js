
const mongoose = require("mongoose");
const db = mongoose.connection;
db.on("error", () => {
  client.connectedToMongoose = false;
  console.error.bind(console, "connection error:");
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  client.connectedToMongoose = true;
});
db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
    client.connectedToMongoose = false;
});