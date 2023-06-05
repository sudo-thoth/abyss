// UnTested

const x = require("../../../../module")
const { log } = x

const fetchMessages = async (channel, num, messageType, interaction) => {
    const fetchedMessages = [];
    let continueFetching = true;
    let currentLoop = 0;
    let startTime = null, endTime, avgTimePerLoop, lastMessageId;
  
    const validMessageTypes = ["bot", "non-bot", "all", "link", "file", "audio", "video", "image"];
  
    try {
      // Validate the messageType input
      if (!messageType || !validMessageTypes.includes(messageType)) {
        try {
          await interaction?.editReply("Invalid or no message type provided. Please specify a valid message type: bot, non-bot, all, link, file, audio, video, image.");
        } catch (error) {
          log("Failed to send reply", error);
        }
        throw new Error("Invalid or no message type provided.");
      }
  
      const progressBarWidth = 400;
      const progressBarHeight = 30;
      const progressBarTotal = num ? Math.ceil(num / 100) : 1;
      let progressBar = null;
  
      // Fetch messages from the channel in a loop
      while (continueFetching && (num ? fetchedMessages.length < num : true)) {
        currentLoop++;
        startTime = startTime ?? Date.now();
  
        const limit = num ? Math.min(100, num - fetchedMessages.length) : 100;
        const messages = await channel.messages.fetch({ limit, before: lastMessageId });
  
        if (messages.size === 0) {
          continueFetching = false;
        } else {
          // Filter and push the messages directly into the fetchedMessages array
          for (const message of messages.values()) {
            let isMatching = false;
            switch (messageType) {
              case "bot":
                isMatching = message.author.bot;
                break;
              case "non-bot":
                isMatching = !message.author.bot;
                break;
              case "all":
                isMatching = true;
                break;
              case "link":
                isMatching = message.content.includes("http");
                break;
              case "file":
                isMatching = message.attachments && message.attachments.size > 0;
                break;
              case "audio":
              case "video":
              case "image":
                isMatching = (message.author.id !== interaction?.client.user.id) && message.attachments.some(attachment => attachment.contentType.startsWith(messageType));
                break;
            }
  
            if (isMatching) {
              fetchedMessages.push(message);
            }
          }
  
          if (num && fetchedMessages.length >= num) {
            continueFetching = false;
          }
        }
  
        lastMessageId = messages.last()?.id;
  
        // Update the progress bar and send progress messages if an interaction is provided
        if (interaction && currentLoop % 2 === 0) {
          endTime = Date.now();
          avgTimePerLoop = (endTime - startTime) / currentLoop;
          const loopsLeft = num ? Math.ceil((num - fetchedMessages.length) / 100) : 0;
          const estimatedSecondsLeft = loopsLeft * avgTimePerLoop / 1000;
  
          // Generate and update the progress bar image
          const canvas = createCanvas(progressBarWidth, progressBarHeight);
          const ctx = canvas.getContext('2d');
  
          if (!progressBar) {
            progressBar = new cliProgress.SingleBar({
              format: 'Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
              barCompleteChar: '\u2588',
              barIncompleteChar: '\u2591',
              hideCursor: true
            }, cliProgress.Presets.shades_classic);
          }
  
          progressBar.setTotal(progressBarTotal);
          progressBar.update(currentLoop / 2, {
            eta: estimatedSecondsLeft.toFixed(2),
            value: currentLoop / 2
          });
  
          progressBar.render({}, ctx);
  
          // Convert canvas to a buffer
          const buffer = canvas.toBuffer('image/png');
  
          // TODO: Update the attachment Builder
          // Send the progress bar image as an attachment in the message
          const attachment = new Discord.MessageAttachment(buffer, 'progress.png');
  
          // Send or edit the message with updated progress status and image
          if (fetchedMessages.length === 0) {
            // Send the initial message with the progress bar image
            const progressMessage = await interaction.channel.send('Fetching messages...', attachment);
            fetchedMessages.push(progressMessage);
          } else {
            // Edit the existing message with the updated progress bar image
            const progressMessage = fetchedMessages[fetchedMessages.length - 1];
            progressMessage.edit(`Fetching messages... ${currentLoop / 2}/${progressBarTotal} (${((currentLoop / 2) / progressBarTotal * 100).toFixed(2)}%) ETA: ${estimatedSecondsLeft.toFixed(2)}s`, attachment);
          }
        }
      }
  
      // Fetching completed. Prepare the result.
      log("Fetching completed. Total messages fetched:", fetchedMessages.length);
      const result = fetchedMessages.slice(0, num || fetchedMessages.length);
  
      if (result.length === 0) {
        try {
          await interaction?.editReply("No messages found in the channel that match the specified criteria.");
        } catch (error) {
          if (error.message.toLowerCase().includes("unknown interaction")) {
            log("No interaction to edit");
            return [];
          }
        }
      } else {
        // Delete the progress message from the channel if it exists
        const progressMessage = fetchedMessages.pop();
        if (progressMessage && progressMessage.deletable) {
          try {
            await progressMessage.delete();
          } catch (error) {
            log("Failed to delete progress message", error);
          }
        }
      }
  
      return result;
    } catch (error) {
      log("Failed Fetch Attempt", error);
      return null;
    }
  };
  


  module.exports = fetchMessages