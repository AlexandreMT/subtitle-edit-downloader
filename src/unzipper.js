const fs = require('fs');
const ora = require('ora');
const unzipper = require('unzipper');
const currentPath = process.cwd();

let spinner;

_unzipper = (selectedAsset) => {
  spinner = ora('Unzipping...').start();
  fs.createReadStream(`${currentPath}/${selectedAsset}`)
    .pipe(unzipper.Extract({ path: `${currentPath}` })
    .on('close', () => {
      spinner.succeed();
    }));
}

module.exports = {
  _unzipper
}