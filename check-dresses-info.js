const readline = require('readline');
const fs = require('fs');

const extensionsAreImages = ['jpg','JPG','png','PNG'];
const jsonObjectProperties = ['price','size','additional','dressName','typeOfDress'];
const jsonFileEmptyContent = new Object;
const dressesCatalogMainDir = './src/assets/catalog/dresses/';

const question = question => {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  return new Promise(resolve => {
      rl.question(question, answer => {
          rl.close();
          return resolve(answer);
      });
  });
};


function getNamesList(){
  const list = `${fs.readFileSync('dresses-names.txt')}`.split(',');
  return new Set(list);
}

function makeNamesListFile(dirFsObject){
  let usedNames = new Array;
  for ( let pathElementKey in dirFsObject ){
    const imagesPath = `catalog/dresses/${dirFsObject[pathElementKey]}`;
    const jsonFilePath = `./src/assets/${imagesPath}/about.json`;
    const jsonContentDressName = fs.existsSync(jsonFilePath) ? JSON.parse(`${fs.readFileSync(jsonFilePath)}`).dressName : '';
    if ( jsonContentDressName != '' ) usedNames.push( jsonContentDressName );
  }
  return usedNames;
}

function namesNotUsedBefore(allNames, usedNames){
  let _newAllNames = new Set(allNames);
  usedNames.forEach ( (name) => {
    _newAllNames.delete(name);
  } );
  return _newAllNames;
}

async function makeFileList(){
  const catalogPaths = fs.readdirSync(dressesCatalogMainDir);
  const usedNames = makeNamesListFile(catalogPaths);
  const allPossibleNames = getNamesList();
  const notUsed = namesNotUsedBefore(allPossibleNames, usedNames);
  console.log(notUsed);
  //Начало создания pug файла с объектом данных о платьях
  let fileListCode = ``;
  //Перебор всех папок из dresses, собранных в fileList
  
  for ( let pathElementKey in catalogPaths ){
    const imagesPath = `catalog/dresses/${catalogPaths[pathElementKey]}`;
    const jsonFilePath = `./src/assets/${imagesPath}/about.json`;
    //Проверка наличия JSONа
    const jsonContent = fs.existsSync(jsonFilePath) ? JSON.parse(`${fs.readFileSync(jsonFilePath)}`) : jsonFileEmptyContent;
    const keysToCheckPropExists = Object.keys(jsonContent);
    let isDifferent = false;
    console.log(`Папка ${catalogPaths[pathElementKey]}. В файле ключи - ${keysToCheckPropExists}
Содержимое `);
    console.log(jsonContent);

    for (let key of jsonObjectProperties){
      if ( !keysToCheckPropExists.includes(key) || jsonContent[key] == '' ) {
        let questionText = `отсутсвует ${key} в файле описания платья в папке ${catalogPaths[pathElementKey]}. `;
        if (key == 'typeOfDress' ) questionText += `Перечислить через пробел (lush,greece,lace,straight,mermaid,materity,sleeves,train,cheap) `;
        let missingProperty = await question(`${questionText}Что добавить?:`);
        // console.log( missingProperty );
        jsonContent[key] = missingProperty;
        // console.log(jsonContent);
        isDifferent = true;
      }
    }
    if ( isDifferent ) {
      console.log('Вношу изменения в файл');
      fs.writeFile(jsonFilePath, JSON.stringify(jsonContent), (error) => {
        if (error) throw error;
      })
    } else {
      console.log('Изменения файла не нужны');
    }
    console.log('');
    fileListCode += `{
        imagePath: './${imagesPath}',
        imageNames:[`;
    //Перебор подпапки с картинками
    fs.readdirSync(`${dressesCatalogMainDir}${catalogPaths[pathElementKey]}/`).forEach( fileElement => {
      const fileNameExtension = fileElement.split('.')[fileElement.split('.').length-1];
      if ( extensionsAreImages.includes(fileNameExtension) ) fileListCode += `'${fileElement}',`;
    });
    fileListCode += `],
        additionalInfo: ${JSON.stringify(jsonContent)}
      },`;
  };
  pugFileCode = `- 
  var dressesList = [`;
  pugFileCode += fileListCode;
  pugFileCode +=`]`;
  fs.writeFileSync('./src/pages/catalog/dresses-list.pug',pugFileCode);
  
  //Конец
}

makeFileList();