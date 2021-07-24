const fs = require('fs');
const articlesMixinsDir = `./src/assets/articles/`;
const readyarticlesFileDir = `./src/pages/articles/`;

function getArticlesList(directory, exclude){  
  let allDirectories =  fs.readdirSync(directory);
  const neededDirectories = allDirectories.filter( fileName => !fileName.includes(exclude));
  return neededDirectories;
  
}

function GetHeaderFromFileContent(filePath){
  const content = `${fs.readFileSync(`${filePath}`)}`;
  const startPoint = content.indexOf(' ', content.indexOf('h1')) + 1;
  const endPoint = content.indexOf('\n', startPoint)-1;
  return content.substring(startPoint, endPoint);
}

function generateFiles(){
  let pugFileArticleContent = '';
  const articleMixinsList = getArticlesList(articlesMixinsDir, 'article');
  for (let articleName of articleMixinsList){
    const HeaderOfArticle = GetHeaderFromFileContent(`${articlesMixinsDir}${articleName}/${articleName}.pug`);
    console.log(HeaderOfArticle);
    pugFileArticleContent += `
extends ../layout.pug
include ../../assets/articles/${articleName}/${articleName}
append variables
  -
    var PageHead = {
      title : '${HeaderOfArticle}',
      keywords : '${HeaderOfArticle}',
      description : '${HeaderOfArticle}',
    }
    
append content
  +${articleName}
    `;
    fs.writeFileSync(`${readyarticlesFileDir}${articleName}.pug`,pugFileArticleContent);
  
    pugFileArticleContent = '';
  }
}

const files = {
  asd : 'asd',
  fileGenerate : function() {
    return readyarticlesFileDir;
  }
}

module.exports = generateFiles();