const readlineSync = require('readline-sync');
const fs = require('fs');

const extensionsAreImages = ['jpg','JPG'];
const jsonObjectProperties = ['price','size','additional','dressName','typeOfDress'];

class dressInfoObject {
  constructor() {
    this.imageFileNames = [];
    this.price = '';
  }
}

function checkJsonPropertyNames(fileToCheck){
  const infoToCheck = JSON.parse(`${fs.readFileSync(fileToCheck)}`);
  const keysToCheckPropExists = Object.keys(infoToCheck);
  console.log(keysToCheckPropExists);
  jsonObjectProperties.forEach( key => {
    if ( !keysToCheckPropExists.includes(key) ) {
      const PropertyToAdd = readlineSync.question(`${key} отсутсвует в файле описания платья ${fileToCheck}. Что добавить?:`);
      // infoToCheck.key = ''
    }
  });
  return JSON.stringify(infoToCheck);
}

function makeFileList(){
  // //Начало создания json для обработки через JS
  // let fileList = {};
  // fs.readdirSync('./src/assets/catalog/dresses/').forEach(dir => {
  //   fileList[dir] = new dressInfoObject();
  //   fs.readdirSync(`./src/assets/catalog/dresses/${dir}/`).forEach(file => {
  //     const fileNameExtension = file.split('.')[file.split('.').length-1];
  //     if ( extensionsAreImages.includes(fileNameExtension) ) fileList[dir].imageFileNames.push(file);
  //   });
  //   //Json файлик тоже добавь
  // });
  // console.log(fileList);
  // fs.writeFileSync('./src/assets/catalog/dresses-list.json',JSON.stringify(fileList));
  // //Конец

  //Начало создания pug файла с объектом данных о платьях
  let fileListCode = ``;
  //Перебор всех папок из dresses, собранных в fileList
  fs.readdirSync('./src/assets/catalog/dresses/').forEach( (pathElement) => {
    const iamgesPath = `catalog/dresses/${pathElement}`;
    const jsonFilePath = `./src/assets/${iamgesPath}/about.json`;
    // const jsonContent = fs.readFileSync(jsonFilePath);
    const jsonContent = checkJsonPropertyNames(jsonFilePath);

    fileListCode += `{
        imagePath: './${iamgesPath}',
        imageNames:[`;
    //Перебор подпапки с картинками
    fs.readdirSync(`./src/assets/catalog/dresses/${pathElement}/`).forEach( fileElement => {
      const fileNameExtension = fileElement.split('.')[fileElement.split('.').length-1];
      if ( extensionsAreImages.includes(fileNameExtension) ) fileListCode += `'${fileElement}',`;
    });
    fileListCode += `],
        additionalInfo: ${jsonContent}
      },`;
  });
  pugFileCode = `- 
  var dressesList = [`;
  pugFileCode += fileListCode;
  pugFileCode +=`]`;
  fs.writeFileSync('./src/pages/catalog/dresses-list.pug',pugFileCode);
  
  //Конец
}


makeFileList();