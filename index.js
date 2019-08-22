require('dotenv').config();
const {
  fetchLatestRelease,
  showLatestRelease,
  downloadReleaseAsset
} = require('./src/releases');

start = async () => {
  const latestRelease = await fetchLatestRelease();
  const selectedAsset = await showLatestRelease(latestRelease);
  if (selectedAsset) {
    const isFileDownloaded = await downloadReleaseAsset(selectedAsset);
  }
}

start();