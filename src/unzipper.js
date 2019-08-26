const fs = require('fs');
const ora = require('ora');
const currentPath = process.cwd();
const unzipper = require('unzipper');
const readlineSync = require('readline-sync');

let spinner;

_unzipper = (selectedAsset) => {
  if (readlineSync.keyInYN('Unzip file?')) {
    spinner = ora('Unzipping...').start();
    fs.createReadStream(`${currentPath}/${selectedAsset}`)
      .pipe(unzipper.Extract({ path: `${currentPath}` })
      .on('close', () => {
        spinner.succeed();
      }));
  }
}

module.exports = {
  _unzipper
}