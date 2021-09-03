const fs = require('fs');
const articlesMixinsDir = `./src/assets/articles/`;
const readyarticlesFileDir = `./src/pages/articles/`;

function getArticlesList(directory, exclude){  
  let allDirectories =  fs.readdirSync(directory);
  const neededDirectories = allDirectories.filter( fileName => !fileName.includes(exclude));
  return neededDirectories;
  
}

function getHeaderFromFileContent(filePath){
  const content = `${fs.readFileSync(`${filePath}`)}`;
  const startPoint = content.indexOf(' ', content.indexOf('h1')) + 1;
  const endPoint = content.indexOf('\n', startPoint)-1;
  return content.substring(startPoint, endPoint);
}

function getImageFromFileContent(filePath){
  const content = `${fs.readFileSync(`${filePath}`)}`;
  const startPoint = content.indexOf('src=', content.indexOf('img.')) + 7;
  const endPoint = content.indexOf(')', startPoint)-1;
  return startPoint-7 > 1 ? content.substring(startPoint, endPoint) : '';
}

function generateFiles(){
  let pugFileArticleContent = '';
  let jsonldFileContent = '';
  const articleMixinsList = getArticlesList(articlesMixinsDir, 'article');
  for (let articleName of articleMixinsList){
    const filePath = `${articlesMixinsDir}${articleName}/${articleName}.pug`;
    const HeaderOfArticle = getHeaderFromFileContent(`${filePath}`);
    const jsonImagePath = getImageFromFileContent(`${filePath}`);
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
    globalHead.canonical += '/${articleName}.html'
    breadcumbList[breadcumbList.length] = {
      name : 'Заметки от салона Всё Невестам',
      href : './articles.html'
    }
    breadcumbList[breadcumbList.length] = {
      name : 'Декорация свадьбы растениями и травами',
      href : './${articleName}.html'
    }
    
append head 
  script(type="application/ld+json")
    include ${articleName}-jsonld.json

append content
  +${articleName}
    `;

  jsonldFileContent = `
{
  "@context": "https://schema.org",
  "@type": "Article",
  "name": "${HeaderOfArticle}"`
  if ( jsonImagePath ) jsonldFileContent += `,
  "image": [
    "https://vse-nevestam.ru/${jsonImagePath}"
  ]`
  jsonldFileContent += `
}
    `;
    fs.writeFileSync(`${readyarticlesFileDir}${articleName}.pug`,pugFileArticleContent);
    fs.writeFileSync(`${readyarticlesFileDir}${articleName}-jsonld.json`,jsonldFileContent);
    pugFileArticleContent = '';
    jsonldFileContent = '';
  }
}

module.exports = generateFiles();