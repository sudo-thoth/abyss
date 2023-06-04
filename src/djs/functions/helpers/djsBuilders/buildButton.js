// IMPORTS ...
const x = require("../../../../module.js");
const { ButtonBuilder, log, validateURL } = x

    async function createButton(buttonObj) {
        // Destructure the buttonObj
        let style = buttonObj?.style?.toString()?.toLowercase() || "primary";
        let disabled = buttonObj?.disabled || false;
        let customID = buttonObj?.customID;
        let label = buttonObj?.label;
        let emoji = buttonObj?.emoji;
        let link = buttonObj?.link;
        let button = new ButtonBuilder();
        try {
            // Check if all required properties are defined
        if (!customID && style !== "link") {
          throw new Error("customID is not defined");
        }
        if (!label) {
          throw new Error("label is not defined");
        }
      
        // Check if customID is within the character limit
        if (customID && customID.length > 100) {
          throw new Error("customID is too long");
        }
      
        // Check if label is within the character limit
        if (label.length > 80) {
          throw new Error("label is too long");
        }
      
        // Check if style is a valid value
        if (!["primary", "secondary", "success", "danger", "link"].includes(style)) {
          style = "primary";
        }
      
        // Check if link is a valid URL
        if (link && !validateURL(link)) {
          throw new Error("link is not valid");
        }
      
        // Create the button
        
        button.setStyle(style);
        button.setDisabled(disabled);
        if (!link || !(style === "link")) {
            button.setCustomId(customID);
        }
        button.setLabel(label);
        button.setEmoji(emoji);
        button.setURL(link);
        return button;
        } catch (error) {
              log( "Error Building Button", error.message ,button, error);
              return null
        }
      }
      

module.exports = { createButton };


//   // Example Modal Object that gets passed in below
// let buttonObj = {
//     label: "🗜️ Compress File", { less than 45 characters }
//     style: "link", { primary, secondary, success, danger, link}
//     disabled: false, { true, false }
//     emoji: "🗜️"
//     link: "https://www.google.com",
//
// }
// // OR
// let buttonObj = {
//     customID: "compress", { less than 100 characters }
//     label: "🗜️ Compress File", { less than 45 characters }
//     style: "primary", { primary, secondary, success, danger, link}
//     disabled: true, { true, false }
//     emoji: "🗜️"
// }

/**
 * Creates a new row using the provided button object.
 * @param {Object} buttonObj - The button object containing the button properties.
 * @param {string} buttonObj.customID - The custom ID of the button.
 * @param {string} buttonObj.label - The label of the button.
 * @param {string} buttonObj.style - The style of the button.
 * @param {boolean} buttonObj.disabled - Indicates whether the button is disabled.
 * @param {string} buttonObj.emoji - The emoji of the button.
 * @param {string} buttonObj.link - The link of the button.
 */

