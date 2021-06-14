// const readlineSync = require('readline-sync');
// const fs = require('fs');

// const russianString = 'отсутсвует в файле описания платья . Что добавить?:';

// readlineSync.setDefaultOptions({
//   print: function(display, encoding)
// });
// console.log(`${russianString}`);
// const PropertyToAdd = readlineSync.question();
// console.log(PropertyToAdd);

const { ajaxTransport } = require('jquery');
const readline = require('readline');
const russianString = 'отсутсвует в файле описания платья . Что добавить?:';
const array = ['1','2','3'];

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

let returningArray = new Array;

async function main(arr) {
    
    for (let elem of arr) {
        const answer = await question(russianString);
        returningArray.push(answer);
    }
    console.log( returningArray );
}

main(array);
// for (let elem of array) {
//     main().catch(console.error);
// }
