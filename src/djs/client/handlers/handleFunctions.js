const fs = require('fs');

module.exports = function handleFunctions(functionFolders, path) {
  const functionsArray = [];
  const isFile = fs.statSync(`${path}/${functionFolders}`).isFile();

  if (isFile) {
    const filePath = `${path}/${functionFolders}`;
    const functionFile = require(filePath);
    functionsArray.push(functionFile.toString());
    console.log(`Function File Loaded: ${filePath}`);
  } else {
    handleFolder(functionFolders, path, functionsArray);
  }

  console.log(`Handle Functions: ✅`);
  return functionsArray;
};

function handleFolder(folder, path, functionsArray) {
  const folderPath = `${path}/${folder}`;
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = `${folderPath}/${file}`;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      handleFolder(file, folderPath, functionsArray); // Recursively handle files within subfolder
    } else if (file.endsWith('.js')) {
      const functionFile = require(filePath);
      functionsArray.push(functionFile.toString());
      console.log(`Function File Loaded: ${folderPath}/${file}`);
    }
  }
}
