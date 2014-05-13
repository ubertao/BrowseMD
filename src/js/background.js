/* global chrome */

function onBackgroundMessage(message, sender) {
    if (message && message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
        chrome.pageAction.setTitle({
            tabId: sender.tab.id,
            title: 'url=' + sender.tab.url
        });
    }
}

chrome.runtime.onMessage.addListener(onBackgroundMessage);
