let global_url;

function getCurrentTabUrl() {
    var queryInfo = {
        active: true,
    }

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0]
        return tab.url;
    });
}

async function logListener(info) {
    try {
        let tabInfo = await browser.tabs.get(info.tabId);
        console.log(tabInfo.url)
        global_url = tabInfo.url;
        console.log(tabInfo);
    } catch (error) {
        console.error(error);
    }
}

browser.tabs.onActivated.addListener(logListener);

function sendURL() {
    let url = global_url;
    var creating = browser.tabs.create({
        'active': true,
        'url': 'http://example.com/' + url
    });
}

browser.contextMenus.create({
    id: "send-url",
    title: "Send URL to ..",
    contexts: ["all"]
}, function () { console.log('Added context item send-url'); });

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "send-url":
            console.log("sending url");
            sendURL();
            break;
    }
});