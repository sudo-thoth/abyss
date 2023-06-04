// This function creates a Discord embed object from an object.
//
// Parameters:
//   obj - An object that contains the properties for the embed.
//
// Returns:
//   An Embed object or an error Embed object
// ** See example embed object at the bottom of the file **


const x = require("../../../../module.js")

const { EmbedBuilder, isDefined, validateUrl, isColor } = x


const errEmbed = new EmbedBuilder()
  .setColor("#FF0000")
  .setTitle("❗️ Error")
  .setDescription("Invalid properties were given to create the embed");


 module.exports = function createEmbed(obj) {
    // Check if the obj has a valid value in the title, description, image, or fields array
    // At least one of these properties must be present in the obj for the embed to be valid
    if (!obj || (!obj.title && !obj.description && !obj.image && (!obj.fields || obj.fields.length === 0))) {
      log("Invalid properties were given to create the embed", obj);
      return errEmbed;
    }
  
    // Create a new EmbedBuilder instance
    const embed = new EmbedBuilder();
  
    // Check if the URL is longer than Discord's URL character limit (2000 characters)
    if (isDefined(obj.url) && obj.url.length > 2000) {
      obj.url = obj.url.substring(0, 2000);
    }
  
    // Check if the URL is a valid URL
    if (isDefined(obj.url) && !validateUrl(obj.url)) {
      log("Invalid URL was provided", obj.url);
      return errEmbed;
    }
  
    // Set the embed properties
    if (isDefined(obj.title)) {
      // Check if the title is longer than 256 characters
      if (obj.title.length > 256) {
        obj.title = obj.title.substring(0, 256);
      }
      embed.setTitle(obj.title);
    }
    if (isDefined(obj.description)) {
      // Check if the description is longer than Discord's embed description character limit (2048 characters)
      if (obj.description.length > 2048) {
        obj.description = obj.description.substring(0, 2048);
      }
      embed.setDescription(obj.description);
    }
    if (isDefined(obj.color)) {
      if (!isColor(obj.color)) {
        log("Invalid color was provided", obj.color);
        return errEmbed;
      }
      embed.setColor(obj.color);
    }
    if (isDefined(obj.footer)) {
      if (obj.footer.text && obj.footer.text.length > 2048) {
        obj.footer.text = obj.footer.text.substring(0, 2048);
      }
      if (obj.footer.iconURL && obj.footer.iconURL.length > 1024) {
        obj.footer.iconURL = obj.footer.iconURL.substring(0, 1024);
      }
      embed.setFooter({
        text: obj.footer.text || '\u0020',
        iconURL: obj.footer.iconURL
      });
    }
    if (isDefined(obj.timestamp)) {
      if (!Date.parse(obj.timestamp)) {
        log("Invalid timestamp was provided", obj.timestamp);
        return errEmbed;
      }
      embed.setTimestamp(obj.timestamp);
    }
    if (isDefined(obj.thumbnail)) {
      if (typeof obj.thumbnail === 'string') {
        embed.setThumbnail(obj.thumbnail);
      } else if (typeof obj.thumbnail === 'object' && obj.thumbnail?.url) {
        embed.setThumbnail(obj.thumbnail?.url);
      }
    }
    if (isDefined(obj.image)) {
      if (typeof obj.image === 'string') {
        embed.setImage(obj.image);
      } else if (typeof obj.image === 'object' && obj.image?.url) {
        embed.setImage(obj.image?.url);
      }
    }
    if (isDefined(obj.author)) {
      embed.setAuthor({
        name: obj.author.name || '\u0020',
        iconURL: obj.author.iconURL,
        url: obj.author.url
      });
    }
  
    // Add the fields to the embed
    if (isDefined(obj.fields) && obj.fields.length > 0) {
      obj.fields.forEach((field) => {
        if (!field.value) return;
        embed.addFields({
          name: field.name,
          value: field.value,
          inline: field.inline
        });
      });
    }
  
    // Return the completed embed
    return embed;
  }
    


  /* Example embed object that gets passed in below
const embedObj = {
    title: 'Title',
    description: 'Description',
    color: '#FF0000',
    url: 'https://example.com',
    footer: {
        text: 'Footer text',
        iconURL: 'https://example.com/image.png'
    },
    thumbnail: 'https://example.com/image.png',
    image: 'https://example.com/image.png',
    author: {
            // The display name of the user
            name: 'Logan',
            // the icon URL will be the discord avatar of the person who ran the command
            iconURL: `${interaction.user.avatarURL()}`,
            url: `https://discord.com/users/${interaction.user.id}`,
        },
    fields: [
        {
            name: 'Field 1',
            value: 'Field 1 value',
            inline: true
        },
        {
            name: 'Field 2',
            value: 'Field 2 value',
            inline: true
        }
    ]
};
*/