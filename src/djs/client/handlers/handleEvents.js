const fs = require('fs');

module.exports = (client, folderPath, fileOrFolderName = '') => {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = `${folderPath}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        const newFolderName = fileOrFolderName ? `${fileOrFolderName}/${file}` : file;
        handleEvents(client, `${folderPath}/${file}`, newFolderName); // Recursively handle files within subfolder
      } else if (file.endsWith('.js')) {
        const event = require(filePath);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Event loaded: ${fileOrFolderName ? fileOrFolderName + '/' : ''}${file}`);
      }
    }
  }