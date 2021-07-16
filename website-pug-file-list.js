const fs = require('fs');
const dirToCheckForFiles = new Array('/pages/catalog','/pages/articles');
let pugFilesToConvert = new Array;

for (let directory of dirToCheckForFiles){
  const directoryContent = fs.readdirSync(`./src${directory}`);

  for (let pugFile of directoryContent) {
    pugFilesToConvert.push(`.${directory}/${pugFile}`);
  }
}

module.exports = pugFilesToConvert;