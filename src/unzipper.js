const fs = require('fs');
const ora = require('ora');
const currentPath = process.cwd();
const unzipper = require('unzipper');
const readlineSync = require('readline-sync');

let spinner;

_unzipper = (selectedAsset) => {
  const readStream = `${currentPath}/${selectedAsset}`;
  const unzipFile = readlineSync.keyInYN('Unzip file?');
  
  if (!unzipFile) {
    return removeDownloadedAsset(readStream);
  }

  spinner = ora('Unzipping...').start();
  fs.createReadStream(readStream)
    .pipe(unzipper.Extract({ path: `${currentPath}` })
    .on('close', () => {
      spinner.succeed();
      return removeDownloadedAsset(readStream);
    }));
}

removeDownloadedAsset = (readStream) => {
  if (readlineSync.keyInYN('Delete .zip file?')) {
    spinner = ora('Working...').start();
    try {
      fs.unlinkSync(readStream);
      spinner.succeed();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  _unzipper
}