chrome.runtime.onInstalled.addListener(() => {
  console.log("Linkshelf is installed.");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Linkshelf is started.");
});