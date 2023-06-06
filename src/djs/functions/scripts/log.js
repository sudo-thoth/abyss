/**

This function logs a message and any number of arguments to the console.
The message can be any string. The arguments can be any type of variable.
The function will log the message and arguments to the console, along with the current date and time in the user's local time zone.
If an error is passed as an argument, it will also be logged.
The function will handle errors gracefully, so that the program does not crash if an error occurs.

Parameters:
message - The message to log.
args - Any number of arguments to log.
Returns:
Nothing. 
*/


module.exports = function log(message, ...args) {
  // Get the current time in the user's local time zone.
  const now = new Date();
  const localNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  // Format the message and arguments.
  const formattedMessage = `[${localNow.toLocaleString()}] ${message}`;
  for (const arg of args) {
    formattedMessage += `\t${arg}`;
  }

  // Reformat the date and time.
  const formattedDate = localNow.toLocaleDateString("en-US", { hour12: true });

  // Get the file name of the calling file.
  const stack = new Error().stack.split('\n');
  const callerFile = stack[2].trim().split(' ')[1];

  // Check if any arguments are instances of Error.
  for (const arg of args) {
    if (arg instanceof Error) {
      // Log the error message and stack trace.
      try {
        console.error(`❗️ ${formattedMessage}\t${formattedDate}\t${arg.stack}\t${callerFile}`);
      } catch(e) {
        console.log("Error logging error:", e);
      }
    }
  }

  // Print the message.
  try {
    console.log(`${formattedMessage}\t${formattedDate}\t${callerFile}`);
  } catch(e) {
    console.log("Error logging message:", e);
  }

  // If possible, color code the message.
  if (typeof process !== 'undefined' && process.stdout.isTTY) {
    const colors = {
      string: 34,
      number: 31,
      boolean: 32,
      object: 35,
      other: 39,
    };

    for (const [type, color] of Object.entries(colors)) {
      if (typeof message === type) {
        try {
          console.log('\x1b[3' + color + 'm' + formattedMessage + '\t' + formattedDate + '\t' + callerFile + '\x1b[0m');
        } catch(e) {
          console.log("Error coloring message:", e);
        }
        break;
      }
    }
  }
}