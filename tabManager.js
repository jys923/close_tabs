function closeRightTabs(info, tab) {

	var wTabs = new Array();
	var tabs = new Array();
	
	chrome.tabs.query({ currentWindow: true}, function (wTabs) {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			var tabIDs = new Array();
			for(var i = 0 ; i<wTabs.length ; i++){
				if(tabs[0].index < wTabs[i].index){
					tabIDs.push(wTabs[i].id);
				}
			}
			chrome.tabs.remove(tabIDs, function(){});
		});
	});
}

function closeThisTab(info, tab) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.remove(tabs[0].id, function(){});
	});
}

function closeLeftTabs(info, tab) {

	var wTabs = new Array();
	var tabs = new Array();
	
	chrome.tabs.query({ currentWindow: true}, function (wTabs) {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			var tabIDs = new Array();
			for(var i = 0 ; i<wTabs.length ; i++){
				if(tabs[0].index > wTabs[i].index){
					tabIDs.push(wTabs[i].id);
				}
			}
			chrome.tabs.remove(tabIDs, function(){});
		});
	});
}

function closeOtherTabs(info, tab) {
	
	var wTabs = new Array();
	var tabs = new Array();
	
	chrome.tabs.query({ currentWindow: true}, function (wTabs) {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			var tabIDs = new Array();
			for(var i = 0 ; i<wTabs.length ; i++){
				if(tabs[0].index != wTabs[i].index){
					tabIDs.push(wTabs[i].id);
				}
			}
			chrome.tabs.remove(tabIDs, function(){});
		});
	});
}

function gotoRightTabs(info, tab) {
	
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.move(tabs[0].id, {index : tabs[0].index++});
		//chrome.tabs.move(tabs[0].id, {index : tabs[0].index++}, function() {
		//	alert("move");
		//});
	});
}

function gotoLeftTabs(info, tab) {
	
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.move(tabs[0].id, {'index': tabs[0].index--});
	});
}

// Create one test item for each context type.
/*chrome.contextMenus.create({
  title: "close tabs", 
  contexts:["page"], 
  //onclick: closeRightTabs,
});*/

chrome.contextMenus.create({
  title: "->", 
  contexts:["page"], 
  onclick: closeRightTabs,
});

chrome.contextMenus.create({
  title: "this", 
  contexts:["page"], 
  onclick: closeThisTab,
});

chrome.contextMenus.create({
  title: "<-", 
  contexts:["page"], 
  onclick: closeLeftTabs,
});

chrome.contextMenus.create({
  title: "Other", 
  contexts:["page"], 
  onclick: closeOtherTabs,
});

/*
chrome.contextMenus.create({
  title: "goto", 
  contexts:["page"], 
  //onclick: closeRightTabs,
});

chrome.contextMenus.create({
  title: "->", 
  contexts:["page"], 
  onclick: gotoRightTabs,
});

chrome.contextMenus.create({
  title: "<-", 
  contexts:["page"], 
  onclick: gotoLeftTabs,
});
*/