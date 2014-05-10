var defaultCSS = "css/swiss.css";
var currentCSS = null;

function isMarkdownFile()
{
	return window.location.pathname.search(/\.markdown$|\.mdown$|\.mkdn$|\.md$|\.mkd$|\.mdwn$|\.mdtxt$|\.mdtext$/) != -1;
}

function showMarkdownHTML(tabId, changeInfo, tab)
{
	//var Showdown = require('showdown');
	var converter = new Showdown.converter();
	var html = converter.makeHtml(document.body.textContent);	

	var link = document.createElement("link");
	link.href = chrome.extension.getURL(getCSS());
	link.type = "text/css";
	link.rel = "stylesheet";
	document.head.appendChild(link);
	document.body.innerHTML = html;
}

function getCSS()
{
	if (isMarkdownFile())
		return currentCSS || defaultCSS;
	else
		return null;
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	if (message.type == "setCSS") {
		currentCSS = message.data;
		document.head.querySelector('link[rel="stylesheet"][type="text/css"]').href = chrome.extension.getURL(currentCSS);
	}
	else if (message.type == "getCSS") {
		sendResponse(getCSS());
	}
});

if (isMarkdownFile()) {
	showMarkdownHTML();
	chrome.runtime.sendMessage({type:"showPageAction"});
}