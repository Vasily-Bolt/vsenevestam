const fs = require('fs');
const articlesMixinsDir = `./src/assets/articles/`;
const readyFileDir = `./src/pages/catalog/`;

const dressCatalogPages = {
  allDresses : {
    name : "Свадебные платья",
    href : './all-dresses.html',
  },
  lush : {
    name : "Пышные",
    href : './lush-dresses.html',
  },
  greece : {
    name : "Греческие",
    href : './greece-dresses.html',
  },
  lace : {
    name : "Кружевные",
    href : './lace-dresses.html',
  },
  straight : {
    name : "Прямые",
    href : './straight-dresses.html',
  },
  sleeves : {
    name : "С рукавами",
    href : './sleeves-dresses.html',
  },
  train : {
    name : "Со шлейфом",
    href : './train-dresses.html',
  },
  mermaid : {
    name : "Русалка",
    href : './mermaid-dresses.html',
  },
  materity : {
    name : "Беременным",
    href : './materity-dresses.html',
  },
  cheap : {
    name : "Дешевые",
    href : './cheap-dresses.html',
  },
  discount : {
    name : "Распродажа",
    href : './discount.html',
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
      href : './articles.html'
    }
    breadcumbList[breadcumbList.length] = {
      name : 'Декорация свадьбы растениями и травами',
      href : './${articleName}.html'
    }
    
append content
  +${articleName}
    `;
    fs.writeFileSync(`${readyFileDir}${articleName}.pug`,pugFileArticleContent);
  
    pugFileArticleContent = '';
  }
}


module.exports = generateFiles();