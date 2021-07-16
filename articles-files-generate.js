const fs = require('fs');
const articlesMixinsDir = `./src/assets/articles/`;
const readyArtcilesFileDir = `./src/pages/articles/`;

function getArtcilesList(directory, exclude){  
  let allDirectories =  fs.readdirSync(directory);
  const neededDirectories = allDirectories.filter( fileName => !fileName.includes(exclude));
  return neededDirectories;
  
}

console.log( getArtcilesList(articlesMixinsDir, 'article') );