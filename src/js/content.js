/* global chrome, Showdown */
var defaultCSS = "css/github.css";
var textCSS = "css/text.css";
var currentCSS = null;
var mdTextNode = null;
var mdHtmlNode = null;
var filePath = window.location.pathname;
var docProtocol = window.location.protocol;

function isMarkdownFile(path)
{
	var hasMarkdownExt = (path.search(/\.markdown$|\.mdown$|\.mkdn$|\.md$|\.mkd$|\.mdwn$|\.mdtxt$|\.mdtext$/) !== -1);
	if (docProtocol === "http:" || docProtocol === "https:") {
		return hasMarkdownExt && document.body.childElementCount === 1 && document.body.firstChild.tagName === "PRE";
	}
	else {
		return hasMarkdownExt;
	}
}

function showMarkdownHTML(show)
{
	document.head.querySelector('link[rel="stylesheet"][type="text/css"]').href = chrome.extension.getURL(currentCSS);
	mdTextNode.hidden = show;
	mdHtmlNode.hidden = !show;
}

function init()
{
	currentCSS = defaultCSS;

	mdTextNode = document.body.firstChild; // <pre>
	mdHtmlNode = document.createElement("div");
	mdTextNode.id = "md-text";
	mdHtmlNode.id = "md-html";

	var mdConverter = new Showdown.converter();
	var mdHtml = mdConverter.makeHtml(mdTextNode.textContent);
	mdHtmlNode.innerHTML = mdHtml;
	mdHtmlNode.hidden = true;
	document.body.appendChild(mdHtmlNode);

	var link = document.createElement("link");
	link.href = chrome.extension.getURL(currentCSS);
	link.type = "text/css";
	link.rel = "stylesheet";
	link.id = "md-style";
	document.head.appendChild(link);
}

function onContentMessage(message,sender,sendResponse) {
	if (message.type === "setCSS") {
		currentCSS = message.data;
		if (currentCSS === textCSS) {
			showMarkdownHTML(false);
		}
		else {
			showMarkdownHTML(true);
		}
	}
	else if (message.type === "getCSS") {
		sendResponse(currentCSS);
	}
}


if (isMarkdownFile(filePath)) {
	chrome.runtime.onMessage.addListener(onContentMessage);
	init();
	showMarkdownHTML(true);	
	chrome.runtime.sendMessage({type:"showPageAction"});
}