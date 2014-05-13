/* global chrome */

function currentCSS(css) {
	Array.prototype.some.call(document.getElementsByName('css'), function(radio){
		if (radio.value === css) {
			radio.checked = true;
			return true;
		}
	}); 
}

function onClickCSS(e) {
	var css = e.target.value;
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,{type:"setCSS",data:css});
	});
	window.close();
}

chrome.tabs.query({active:true,currentWindow:true},function(tabs){
	chrome.tabs.sendMessage(tabs[0].id,{type:"getCSS"}, function(css){
		currentCSS(css);
	});
});

Array.prototype.forEach.call(document.querySelectorAll('input[type="radio"]'), function(radio) {
	radio.addEventListener("click",onClickCSS);
});
