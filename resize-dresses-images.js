function getExtension(fileName){
  return fileName.split('.')[fileName.split('.').length-1];
}

function CheckDirentFileIsPicture(direntFile){
  return direntFile.isFile() ? extensionsAreImages.includes(getExtension(direntFile.name)) : false;
}

const extensionsAreImages = ['jpg','JPG','png','PNG'];

const filesPath = `./src/assets/catalog/dresses`;
// const pathSizedImages = ['s','m','l'];
const pathSizedImages = new Map([
  ['s', 320],
  ['m', 375],
  ['l', 425],
]);
const sharp = require('sharp');
const fs = require('fs');

const catalogPaths = fs.readdirSync(`${filesPath}`);

function doResizing() {
  for (let pathIndex in catalogPaths ) {
    const thisCatalogPath = `${filesPath}/${catalogPaths[pathIndex]}`;
    fs.readdir(thisCatalogPath, {withFileTypes : true}, (err,files)=>{
      // files.forEach(file => { console.log(`${file.name} - File: ${file.isFile()}`)}) // Проверка, что не директория
  
      //Проверка наличия директорий для файлов размного размера. Создание в случае отсутсвия
      // const pathSizedImagesKeys = pathSizedImages.keys();
      for (let pathNameToCheckExists of pathSizedImages.keys() ) {
        const fullPathName = `${thisCatalogPath}/${pathNameToCheckExists}`;
        if ( !fs.existsSync(`${fullPathName}`) ) fs.mkdirSync(`${fullPathName}`, (err) => {if (err) throw err});
      }
      // pathSizedImagesKeys.forEach( pathNameToCheckExists => {
      //   const fullPathName = `${thisCatalogPath}/${pathNameToCheckExists}`;
      //   if ( !fs.existsSync(`${fullPathName}`) ) fs.mkdirSync(`${fullPathName}`, (err) => {if (err) throw err});
      // });
  
      //Переборка файлов и сохранение в нужном размере
      files.forEach( file => {
        console.log( `${thisCatalogPath}/${file.name} is PIC - Resizing and copying...` );
        if ( CheckDirentFileIsPicture(file) ) {
          pathSizedImages.forEach( (sizeOfNewImage, pathOfResizedImage) => {
            sharp(`${thisCatalogPath}/${file.name}`)
            .resize(sizeOfNewImage)
            .toFile(`${thisCatalogPath}/${pathOfResizedImage}/${file.name}`)
            .then(()=>{console.log(`${thisCatalogPath}/${pathOfResizedImage}/${file.name} - DONE`)})  
          })
        }
        
      });
    })
  }
}

module.exports = doResizing();