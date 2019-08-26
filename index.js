const {
  fetchLatestRelease,
  showLatestReleaseAndSelectAsset,
  downloadReleaseAsset
} = require('./src/releases');

start = async () => {
  const latestRelease = await fetchLatestRelease();
  const selectedAsset = await showLatestReleaseAndSelectAsset(latestRelease);
  if (selectedAsset) {
    await downloadReleaseAsset(selectedAsset);
  }
}

start();