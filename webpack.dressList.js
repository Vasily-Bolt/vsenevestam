const fs = require('fs');
const extensionsAreImages = ['jpg','JPG'];

class dressInfoObject {
  constructor() {
    this.imageFileNames = [];
    this.price = '';
  }
}

let makeFileList = function makeFileList(){

  let fileList = {};
  fs.readdirSync('./src/assets/images/dresses/').forEach(dir => {
    fileList[dir] = new dressInfoObject();
    fs.readdirSync(`./src/assets/images/dresses/${dir}/`).forEach(file => {
      const fileNameExtension = file.split('.')[file.split('.').length-1];
      if ( extensionsAreImages.includes(fileNameExtension) ) fileList[dir].imageFileNames.push(file);
    });
    //Json файлик тоже добавь
  });
  console.log(fileList);

  // let fileListCode = ``;
  // //Перебор всех папок из dresses, собранных в fileList
  // fs.readdirSync('./src/assets/images/dresses/').forEach( (pathElement) => {
  //   const iamgesPath = `images/dresses/${pathElement}`;
  //   const jsonFilePath = `./src/assets/${iamgesPath}/about.json`;

  //   const jsonContent = fs.readFileSync(jsonFilePath);
    
  //   fileListCode += `{
  //       imagePath: './${iamgesPath}',
  //       imageNames:[`;
  //   //Перебор подпапки с картинками
  //   fileList[pathElement].forEach( (fileElement) => {
  //     const fileNameExtension = fileElement.split('.')[fileElement.split('.').length-1];
  //     if ( extensionsAreImages.includes(fileNameExtension) ) fileListCode += `'${fileElement}',`;
  //   });
  //   fileListCode += `],
  //       additionalInfo: ${jsonContent}
  //     },`;
  // });
  // pugFileCode = `- 
  // var allDressesList = [{imagePath: './images/dresses/0001/1.JPG'},{imagePath: './images/dresses/0001/2.JPG'},{imagePath: './images/dresses/0001/3.JPG'},{imagePath: './images/dresses/0002/1.JPG'},{imagePath: './images/dresses/0002/2.JPG'},{imagePath: './images/dresses/0002/3.JPG'},{imagePath: './images/dresses/0003/1.JPG'},{imagePath: './images/dresses/0003/2.JPG'},{imagePath: './images/dresses/0003/3.JPG'},{imagePath: './images/dresses/0004/1.JPG'},{imagePath: './images/dresses/0004/2.JPG'},{imagePath: './images/dresses/0004/3.JPG'},{imagePath: './images/dresses/0005/1.JPG'},{imagePath: './images/dresses/0005/2.JPG'},{imagePath: './images/dresses/0005/3.JPG'},{imagePath: './images/dresses/0006/1.JPG'},{imagePath: './images/dresses/0006/2.JPG'},{imagePath: './images/dresses/0006/3.JPG'},{imagePath: './images/dresses/0006/4.JPG'},{imagePath: './images/dresses/0007/1.JPG'},{imagePath: './images/dresses/0007/2.JPG'},{imagePath: './images/dresses/0007/3.JPG'},{imagePath: './images/dresses/0007/4.JPG'},{imagePath: './images/dresses/0007/5.JPG'},{imagePath: './images/dresses/0007/6.JPG'},{imagePath: './images/dresses/0008/1.JPG'},{imagePath: './images/dresses/0008/2.JPG'},{imagePath: './images/dresses/0009/1.JPG'},{imagePath: './images/dresses/0009/2.JPG'},{imagePath: './images/dresses/0010/IMG_1211.JPG'},{imagePath: './images/dresses/0010/IMG_1212.JPG'},{imagePath: './images/dresses/0010/IMG_1213.JPG'},{imagePath: './images/dresses/0010/IMG_1214.JPG'},{imagePath: './images/dresses/0011/IMG_1215.JPG'},{imagePath: './images/dresses/0011/IMG_1216.JPG'},{imagePath: './images/dresses/0011/IMG_1217.JPG'},{imagePath: './images/dresses/0012/IMG_1218.JPG'},{imagePath: './images/dresses/0012/IMG_1219.JPG'},{imagePath: './images/dresses/0012/IMG_1220.JPG'},{imagePath: './images/dresses/0012/IMG_1221.JPG'},{imagePath: './images/dresses/0012/IMG_1222.JPG'},{imagePath: './images/dresses/0013/IMG_1223.JPG'},{imagePath: './images/dresses/0013/IMG_1224.JPG'},{imagePath: './images/dresses/0013/IMG_1225.JPG'},{imagePath: './images/dresses/0013/IMG_1226.JPG'},{imagePath: './images/dresses/0013/IMG_1227.JPG'},{imagePath: './images/dresses/0014/IMG_1228.JPG'},{imagePath: './images/dresses/0014/IMG_1229.JPG'},{imagePath: './images/dresses/0014/IMG_1230.JPG'},{imagePath: './images/dresses/0015/IMG_1231.JPG'},{imagePath: './images/dresses/0015/IMG_1232.JPG'},{imagePath: './images/dresses/0015/IMG_1233.JPG'},{imagePath: './images/dresses/0015/IMG_1234.JPG'},{imagePath: './images/dresses/0016/IMG_1235.JPG'},{imagePath: './images/dresses/0016/IMG_1236.JPG'},{imagePath: './images/dresses/0016/IMG_1237.JPG'},{imagePath: './images/dresses/0016/IMG_1238.JPG'},{imagePath: './images/dresses/0016/IMG_1239.JPG'},{imagePath: './images/dresses/0017/IMG_1240.JPG'},{imagePath: './images/dresses/0017/IMG_1241.JPG'},{imagePath: './images/dresses/0017/IMG_1242.JPG'},{imagePath: './images/dresses/0018/IMG_1243.JPG'},{imagePath: './images/dresses/0018/IMG_1244.JPG'},{imagePath: './images/dresses/0018/IMG_1245.JPG'},{imagePath: './images/dresses/0019/IMG_1246.JPG'},{imagePath: './images/dresses/0019/IMG_1247.JPG'},{imagePath: './images/dresses/0019/IMG_1248.JPG'},{imagePath: './images/dresses/0019/IMG_1249.JPG'},]
  // var dressesList = [`;
  // pugFileCode += fileListCode;
  // pugFileCode +=`]`;
  // fs.writeFileSync('./src/pages/catalog/dresses-list.pug',pugFileCode);
  fs.writeFileSync('./src/assets/images/dresses-list.json',JSON.stringify(fileList));
}

exports.makeFileList = makeFileList;