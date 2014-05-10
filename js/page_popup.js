function currentCSS(css) {
	Array.prototype.some.call(document.getElementsByName('css'), function(radio){
		if (radio.value == css) {
			radio.checked = true;
			return true;
		}
	}); 
}

function onClickCSS(e) {
	console.log("clicked:"+e.target.value);
	var css = e.target.value;
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,{type:"setCSS",data:css});
	});
	window.close();
}


chrome.tabs.query({active:true,currentWindow:true},function(tabs){
	chrome.tabs.sendMessage(tabs[0].id,{type:"getCSS"}, function(css){
		if (css) {
			chrome.pageAction.show(tabs[0].id);
			currentCSS(css);
		}
	});
});

Array.prototype.forEach.call(document.querySelectorAll('input[type="radio"]'), function(radio) {
	radio.addEventListener("click",onClickCSS);
});
