chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': chrome.extension.getURL('public/build/html/login.html')}, function(tab) {
    // Tab opened.
  });
});
