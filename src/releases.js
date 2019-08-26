const readlineSync = require('readline-sync');
const axios = require('axios');
const ora = require('ora');
const urls = require('../enviroment').urls;

const request = require('request');
const fs = require('fs');
const { _unzipper } = require('./unzipper');

let releaseTagName;
let spinner;

fetchLatestRelease = async () => {
  if (readlineSync.keyInYN('Fetch Subtitle Edit latest release?')) {
    try {
      spinner = ora('Fetching latest release...').start();
      const latestReleaseUrl = `${urls.GITHUB_API_URL}/repos/${urls.SUBTITLE_EDIT_GIT_REPO_URL}/releases/latest`;
      const latestRelease = await axios.get(latestReleaseUrl);
      releaseTagName = latestRelease.data.tag_name;
      spinner.succeed();
      return latestRelease;
    } catch (error) {
      console.log(error);
    }
  }
}

showLatestReleaseAndSelectAsset = (latestRelease) => {
  if (readlineSync.keyInYN(`Latest release is ${latestRelease.data.name} released at ${latestRelease.data.created_at}. List assets?`)) {
    try {
      const assets = latestRelease.data.assets.map((asset) => {
        return `${asset.name} - Updated at: ${asset.updated_at}`;
      });

      indexAsset = readlineSync.keyInSelect(assets, 'Which release?');
      if (indexAsset > 0) {
        return selectedAsset = assets[indexAsset].split(' - ')[0].trim();
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
}

downloadReleaseAsset = async (selectedAsset) => {
  try {
    const downloadAssetUrl = `${urls.SUBTITLE_EDIT_GIT_RELEASE_DOWNLOAD_URL}/${releaseTagName}/${selectedAsset}`;

    spinner = ora('Downloading asset...').start();
    
    request(downloadAssetUrl)
      .pipe(fs.createWriteStream(selectedAsset))
      .on('close', () => {
        spinner.succeed();
        _unzipper(selectedAsset);
        return true;
      })
      .on('error', () => {
        console.log('Something went bad on downloading the asset');
        return false;
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchLatestRelease,
  showLatestReleaseAndSelectAsset,
  downloadReleaseAsset
};