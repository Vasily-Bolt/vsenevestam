const readline = require('readline');
const fs = require('fs');

const extensionsAreImages = ['jpg','JPG'];
const jsonObjectProperties = ['price','size','additional','dressName','typeOfDress'];

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

async function makeFileList(){

  //Начало создания pug файла с объектом данных о платьях
  let fileListCode = ``;
  //Перебор всех папок из dresses, собранных в fileList
  catalogPaths = fs.readdirSync('./src/assets/catalog/dresses/');
  for ( let pathElementKey in catalogPaths ){
    const iamgesPath = `catalog/dresses/${catalogPaths[pathElementKey]}`;
    const jsonFilePath = `./src/assets/${iamgesPath}/about.json`;
    let jsonContent = JSON.parse(`${fs.readFileSync(jsonFilePath)}`);
    const keysToCheckPropExists = Object.keys(jsonContent);

    console.log(catalogPaths[pathElementKey]);
    console.log(keysToCheckPropExists);
    console.log(jsonContent);

    for (let key of jsonObjectProperties){
      if ( !keysToCheckPropExists.includes(key) ) {
        let questionText = `отсутсвует ${key} в файле описания платья. `;
        if (key == 'typeOfDress' ) questionText += `Перечислить через пробел (lush,greece,lace,straight,mermaid,materity,sleeves,train,cheap) `;
        let missingProperty = await question(`${questionText}Что добавить?:`);
        console.log( missingProperty );
        jsonContent[key] = missingProperty;
        console.log(jsonContent);
      }
    }

    fileListCode += `{
        imagePath: './${iamgesPath}',
        imageNames:[`;
    //Перебор подпапки с картинками
    fs.readdirSync(`./src/assets/catalog/dresses/${catalogPaths[pathElementKey]}/`).forEach( fileElement => {
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