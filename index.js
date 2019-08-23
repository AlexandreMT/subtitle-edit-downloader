const {
  fetchLatestRelease,
  showLatestReleaseAndSelectAsset,
  downloadReleaseAsset
} = require('./src/releases');

start = async () => {
  const latestRelease = await fetchLatestRelease();
  const selectedAsset = await showLatestReleaseAndSelectAsset(latestRelease);
  if (selectedAsset) {
    const isFileDownloaded = await downloadReleaseAsset(selectedAsset);
  }
}

start();