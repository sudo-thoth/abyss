// INCOMPLETE
// TODO: Finish this function.`

module.exports = function Tracker(object, objectArray) {
    // Get the current time.
    const now = new Date();
  
    // Create a new log entry.
    const logEntry = {
      function: object.function,
      action: object.action,
      text: object.text,
      time: now.toLocaleString(),
    };
  
    // Add the log entry to the database.
    db.insertLogEntry(logEntry);
  }
  