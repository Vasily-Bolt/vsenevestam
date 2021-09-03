const fs = require('fs');
const dirToCheckForFiles = new Array('/pages/catalog','/pages/articles','/pages/additional');
let pugFilesToConvert = new Array;

for (let directory of dirToCheckForFiles){
  const directoryContent = fs.readdirSync(`./src${directory}`);

  for (let pugFile of directoryContent) {
    if ( pugFile.includes('.pug') )
      pugFilesToConvert.push(`.${directory}/${pugFile}`);
  }
}

module.exports = pugFilesToConvert;