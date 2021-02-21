console.log('Hello from content.js');

chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(message,sender,sendResponse){
    selectedText = window.getSelection().toString(); 
    if (selectedText) {
        url_f = "https://api.wordnik.com/v4/word.json/"
        url_b = "/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
        let data = await fetch(url_f+selectedText+url_b)
        let data2 = await data.json()
        if(data.status==200){
            if(data2[0].text){
                defn = data2[0].text
            }else{
                defn = selectedText + " is a very commonly used word."
            }
        }else{
            defn = "Can't find. Please, select a single word"
        }
        let msg = {
            wrd:selectedText,
            defn:defn
        }
        chrome.runtime.sendMessage(msg);
    }else{
        let msg = {
            wrd:"Not selected",
            defn:"Please, select a single word"
        }
        chrome.runtime.sendMessage(msg);
    }
}