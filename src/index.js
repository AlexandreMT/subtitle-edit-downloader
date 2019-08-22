require('dotenv').config();
const {
  fetchLatestRelease,
  showLatestRelease,
  downloadReleaseAsset } = require('./releases');

start = async () => {
  const latestRelease = await fetchLatestRelease();
  const selectedAsset = await showLatestRelease(latestRelease);
  const urlAssetDownload = await downloadReleaseAsset(selectedAsset);

  console.log(urlAssetDownload);
}

start();