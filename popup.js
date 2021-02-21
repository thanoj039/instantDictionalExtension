console.log("Hello from popup.js!!");
window.onload = function(){
    params={
        active:true,
        currentWindow:true
    };
    chrome.tabs.query(params,sendMsg);
    function sendMsg(tabs){
        chrome.tabs.sendMessage(tabs[0].id,"getDefiniton");
    }
}

chrome.runtime.onMessage.addListener(recieveMsg);
function recieveMsg(message,sender,sendResponse){
    var word = document.getElementById("wrd")
    word.innerText = message.wrd
    var definition = document.getElementById("def")
    definition.innerHTML = message.defn
}