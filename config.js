/**
 * 
 * CREDIT BY KENZ CREATOR
 * KENZ CREATOR 2025
 * NO HAPUS CREDIT
 * 
 */

const chalk  = require("chalk").default
const fs = require("fs")
const { version } = require("./package.json");

module.exports = {
    TOKENBOT: "7501632419:AAHpLNsetvxIGCE0KlfAdyGD29Rpi2pQyNg",
    versi: version,
    owner: [7299507029],
    ownernama: "Kenz Creator",
    namabot: "Tobitob Tele",
    menu: "https://kenz.cloudx.biz.id/download/1740567618661.jpg",
    creator: "Kenz Developer Tobitob",
    passwd: "adminbot123"
    
};

//~~~~~~~~~~~< NOT CHANGE >~~~~~~~~~~//
let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan("File Update => "), chalk.cyan.bgBlue.bold(`${__filename} Harap Restart Bot !!!`))
})