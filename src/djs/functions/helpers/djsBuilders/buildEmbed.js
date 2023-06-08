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


module.exports = function createEmbed(obj) {
  // Check if the obj has a valid value in the title, description, image, or fields array
  // At least one of these properties must be present in the obj for the embed to be valid
  if (!obj || (!obj.title && !obj.description && !obj.image && (!obj.fields || obj.fields.length === 0))) {
    log("Invalid properties were given to create the embed", obj);
    return null;
  }

  // Create a new EmbedBuilder instance
  const embed = new EmbedBuilder();

  // Check if the URL is longer than Discord's URL character limit (2000 characters)
  if (isDefined(obj.url)) {
    if (obj.url.length > 2000) {
      obj.url = obj.url.substring(0, 2000);
    }
    // Check if the URL is a valid URL
    if (!validateUrl(obj.url)) {
      log("Invalid URL was provided", obj.url);
    } else {
      embed.setURL(obj.url);
    }
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
    } else {
      embed.setColor(obj.color);
    }
  }
  if (isDefined(obj.image)) {
    // Check if the image URL is a valid URL
    if (!validateUrl(obj.image)) {
      log("Invalid image URL was provided", obj.image);
    } else {
      embed.setImage(obj.image);
    }
  }
  if (isDefined(obj.thumbnail)) {
    // Check if the thumbnail URL is a valid URL
    if (!validateUrl(obj.thumbnail)) {
      log("Invalid thumbnail URL was provided", obj.thumbnail);
    } else {
      embed.setThumbnail(obj.thumbnail);
    }
  }
  if (isDefined(obj.author)) {
    // Check if the author URL is a valid URL
    if (isDefined(obj.author.url) && !validateUrl(obj.author.url)) {
      log("Invalid author URL was provided", obj.author.url);
    } else {
      embed.setAuthor(obj.author.name, obj.author.icon_url, obj.author.url);
    }
  }
  if (isDefined(obj.footer)) {
    embed.setFooter(obj.footer.text, obj.footer.icon_url);
  }
  if (isDefined(obj.timestamp)) {
    embed.setTimestamp(obj.timestamp);
  }
  if (isDefined(obj.fields)) {
    for (const field of obj.fields) {
      // Check if the field name or value is longer than Discord's embed field character limit (256 characters)
      if (field.name.length > 256) {
        field.name = field.name.substring(0, 256);
      }
      if (field.value.length > 1024) {
        field.value = field.value.substring(0, 1024);
      }
      embed.addField(field.name, field.value, field.inline);
    }
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