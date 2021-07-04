const filesPath = `./src/assets/catalog/dresses`;
const sharp = require('sharp');
sharp(`${filesPath}/0002/1.JPG`)
  .resize(200)
  .toFile(`${filesPath}/0002/s/1.jpg`)
  .then(()=>{console.log('ok')})