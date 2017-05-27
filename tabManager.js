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

function gotoRightTab(info, tab) {
	
	var wTabs = new Array();
	var tabs = new Array();
	chrome.tabs.query({ currentWindow: true}, function (wTabs) {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			var tabIDs = new Array();
			for(var i = 0 ; i<wTabs.length ; i++){
				if(tabs[0].index+1 == wTabs.length && wTabs[i].index==0){
					chrome.tabs.update(wTabs[i].id, { active: true });
				}else if(tabs[0].index+1 == wTabs[i].index){
					chrome.tabs.update(wTabs[i].id, { active: true });
				}
			}
		});
	});
}

function gotoLeftTab(info, tab) {
	
	var wTabs = new Array();
	var tabs = new Array();
	chrome.tabs.query({ currentWindow: true}, function (wTabs) {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			var tabIDs = new Array();
			for(var i = 0 ; i<wTabs.length ; i++){
				//if(tabs[0].index-1 == 0 && wTabs[i].index+1==wTabs.length){
				if(tabs[0].index == 0  && wTabs[i].index+1==wTabs.length ){
					chrome.tabs.update(wTabs[i].id, { active: true });
				}else if(tabs[0].index-1 == wTabs[i].index){
					//chrome.tabs.update(wTabs[i].id, { highlighted: true });
					chrome.tabs.update(wTabs[i].id, { active: true });
				}
			}
		});
	});
}


chrome.contextMenus.create({
  title: "->", 
  contexts:["all"], 
  onclick: closeRightTabs,
});

chrome.contextMenus.create({
  title: "this", 
  contexts:["all"], 
  onclick: closeThisTab,
});

chrome.contextMenus.create({
  title: "<-", 
  contexts:["all"], 
  onclick: closeLeftTabs,
});

chrome.contextMenus.create({
  title: "Other", 
  contexts:["all"], 
  onclick: closeOtherTabs,
});

chrome.contextMenus.create({
  type: "separator", 
  contexts:["all"], 
});

chrome.contextMenus.create({
  title: "-->", 
  contexts:["all"], 
  onclick: gotoRightTab,
});

chrome.contextMenus.create({
  title: "<--", 
  contexts:["all"], 
  onclick: gotoLeftTab,
});

/*chrome.contextMenus.create({
  title: "<--", 
  contexts:["page"]}, 
  //onclick: gotoLeftTab,
	function () {
		
		var wTabs = new Array();
		var tabs = new Array();
		chrome.tabs.query({ currentWindow: true}, function (wTabs) {
			chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
				var tabIDs = new Array();
				for(var i = 0 ; i<wTabs.length ; i++){
					//if(tabs[0].index-1 == 0 && wTabs[i].index+1==wTabs.length){
					if(tabs[0].index == 0  && wTabs[i].index+1==wTabs.length ){
						chrome.tabs.update(wTabs[i].id, { active: true });
					}else if(tabs[0].index-1 == wTabs[i].index){
						//chrome.tabs.update(wTabs[i].id, { highlighted: true });
						chrome.tabs.update(wTabs[i].id, { active: true });
					}
				}
			});
		});	
	}
);*/
 