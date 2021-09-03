const fs = require('fs');
const articlesMixinsDir = `./src/assets/articles/`;
const readyFileDir = `./src/pages/catalog/`;

const dressCatalogPages = {
  allDresses : {
    name : "Свадебные платья",
    fileName : 'all-dresses',
  },
  lush : {
    name : "Пышные",
    fileName : 'lush-dresses',
  },
  greece : {
    name : "Греческие",
    fileName : 'greece-dresses',
  },
  lace : {
    name : "Кружевные",
    fileName : 'lace-dresses',
  },
  straight : {
    name : "Прямые",
    fileName : 'straight-dresses',
  },
  sleeves : {
    name : "С рукавами",
    fileName : 'sleeves-dresses',
  },
  train : {
    name : "Со шлейфом",
    fileName : 'train-dresses',
  },
  mermaid : {
    name : "Русалка",
    fileName : 'mermaid-dresses',
  },
  materity : {
    name : "Беременным",
    fileName : 'materity-dresses',
  },
  cheap : {
    name : "Дешевые",
    fileName : 'cheap-dresses',
  },
  discount : {
    name : "Распродажа",
    fileName : 'discount',
  },
}

function getArticlesList(directory){  
  let allFiles =  fs.readdirSync(directory);
  const neededFiles = allFiles.filter( fileName => fileName.includes('article'));
  return neededFiles;
  
}

function generateFiles(){
  let pugFileArticleContent = '';
  const articleMixinsList = getArticlesList(articlesMixinsDir);
  console.log(articleMixinsList);

  for (let articleName of articleMixinsList){
    // const HeaderOfArticle = GetHeaderFromFileContent(`${articlesMixinsDir}${articleName}/${articleName}.pug`);
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
      fileName : './articles.html'
    }
    breadcumbList[breadcumbList.length] = {
      name : 'Декорация свадьбы растениями и травами',
      fileName : './${articleName}.html'
    }
    
append content
  +${articleName}
    `;
    fs.writeFileSync(`${readyFileDir}${articleName}.pug`,pugFileArticleContent);
  
    pugFileArticleContent = '';
  }
}


module.exports = generateFiles();