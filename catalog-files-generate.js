const fs = require('fs');
const articlesMixinsDir = `./src/assets/articles/`;
const readyFileDir = `./src/pages/catalog/`;

const catalogPagesInfo = JSON.parse(`${fs.readFileSync('./src/assets/json/catalog-data.json')}`);

// function getArticlesList(directory){  
//   let allFiles =  fs.readdirSync(directory);
//   const neededFiles = allFiles.filter( fileName => fileName.includes('article') && !fileName.includes('.'));
//   return neededFiles;
// }

function addUniqueFileInfo( pugFileMainContent ){
  const endFileName = '-dresses.html';
  const fileName = `${pugFileMainContent.fileName}${endFileName}`;
  let uniqueInfo = `
extends ../layout.pug
include ./catalog-includes.pug

include ../../assets/articles/${pugFileMainContent.fileName}-dresses-article/${pugFileMainContent.fileName}-dresses-article

append variables
  -
`;
  
  pugFileMainContent.breadcumbText.forEach( (current) => {
    const breadcumbArrayed = current.split(';');
    uniqueInfo += `
    breadcumbList[breadcumbList.length] = {
      name : '${breadcumbArrayed[0]}',
      href : '${breadcumbArrayed[1] !== undefined ? breadcumbArrayed[1]+endFileName : fileName }'
    }`;
  });

  uniqueInfo += `
    var PageHead = {
      title : '${pugFileMainContent.title}',
      keywords : '${pugFileMainContent.keywords}',
      description : '${pugFileMainContent.description}',
    }
    globalHead.canonical += '/${fileName}'
  include ./dresses-list
    //если убрать эту пустую строку то нихера не работает получение переменных из dresses-list

append content
  - 
    var drs = dressesList
    var deleteIndexes = []
  each dress,index in dressesList
    - 
      if ( drs[index].additionalInfo.typeOfDress.includes('${pugFileMainContent.fileName}') ) {
        drs[index].imageName = drs[index].imageNames[0]
        drs[index].underText = [drs[index].additionalInfo.price]
        drs[index].titleUnder = drs[index].additionalInfo.dressName
      } else {
        deleteIndexes.push(index);
      }
  - deleteIndexes.reverse()
  each index in deleteIndexes
    - drs.splice(index,1)
  +dress-cards-list(drs,true)
  +${pugFileMainContent.fileName}-dresses-article
  `;
  
  return uniqueInfo;
}

function createPugFile( fileContent, fileName ){
  fs.writeFileSync(`${readyFileDir}${fileName}`,fileContent);
}

function generateFiles(){

  let pugFileContent = '';

  // const articleMixinsList = getArticlesList(articlesMixinsDir);
  // console.log(articleMixinsList);
  
  pugFileContent = addUniqueFileInfo( catalogPagesInfo.dressesCatalog );
  createPugFile(pugFileContent, `${catalogPagesInfo.dressesCatalog.fileName}-dresses.pug`);
  
  pugFileContent = '';

  // Из корневого All-dresses переносим детям в массив хлебные крошки
  catalogPagesInfo.dressesCatalog.includes.forEach((current) => {
    current.breadcumbText.unshift( `${catalogPagesInfo.dressesCatalog.breadcumbText};${catalogPagesInfo.dressesCatalog.fileName}` );
    pugFileContent = addUniqueFileInfo( current );
    // console.log(pugFileContent);
    createPugFile(pugFileContent, `${current.fileName}-dresses.pug`);
    pugFileContent = '';
  });

  

   
  // for (let articleName of articleMixinsList){
  //   // const HeaderOfArticle = GetHeaderFromFileContent(`${articlesMixinsDir}${articleName}/${articleName}.pug`);
  //   // console.log(HeaderOfArticle);
  //   pugFileContent += `

  //   `;
  //   fs.writeFileSync(`${readyFileDir}${articleName}.pug`,pugFileContent);
  
  //   pugFileContent = '';
  // }
}


module.exports = generateFiles();