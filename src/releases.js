const readlineSync = require('readline-sync');
const axios = require('axios');
const ora = require('ora');

const request = require('superagent');
const fs = require('fs');

let releaseTagName;
let spinner;

fetchLatestRelease = async () => {
  if (readlineSync.keyInYN('Fetch Subtitle Edit latest release?')) {
    try {
      spinner = ora('Fetching releases...').start();
      const latestRelease = await axios.get(`${process.env.GITHUB_API_URL}/repos/${process.env.SUBTITLE_EDIT_GIT_REPO_URL}/releases/latest`);
      releaseTagName = latestRelease.data.tag_name;
      spinner.succeed();
      return latestRelease;
    } catch (error) {
      console.log(error.message);
    }
  }
}

showLatestRelease = (latestRelease) => {
  if (readlineSync.keyInYN(`Latest release is ${latestRelease.data.name} released at ${latestRelease.data.created_at}. Show assets?`)) {
    try {
      let assets = [];
      latestRelease.data.assets.forEach((asset) => {
        assets.push(`${asset.name} - Updated at: ${asset.updated_at}`);
      });
      indexAsset = readlineSync.keyInSelect(assets, 'Which release?');
      if (indexAsset > 0) {
        return selectedAsset = assets[indexAsset].split(' - ')[0].trim();
      }
      return false;
    } catch (error) {
      console.log(error.message);
    }
  }
}

downloadReleaseAsset = async (selectedAsset) => {
  try {
    const downloadAssetUrl = `${process.env.SUBTITLE_EDIT_GIT_RELEASE_DOWNLOAD_URL}/${releaseTagName}/${selectedAsset}`;

    spinner = ora('Downloading asset...').start();
    request
      .get(downloadAssetUrl)
      .on('error', function () {
        console.log(error);
      })
      .pipe(fs.createWriteStream(selectedAsset))
      .on('finish', function () {
        spinner.succeed();
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchLatestRelease,
  showLatestRelease,
  downloadReleaseAsset
};