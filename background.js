let global_url;

async function logListener(info) {
    try {
        let tabInfo = await browser.tabs.get(info.tabId);
        console.log(tabInfo.url)
        global_url = tabInfo.url;
        console.log(tabInfo);
    } catch (error) {
        try {
            chrome.tabs.getSelected(null, function (tab) {
                global_url = tab.url;
            });
        } catch (error) {
            console.error(error);
        }
    }
}

browser.tabs.onActivated.addListener(logListener);

function sendURL() {
    let url = global_url;
    try {
        var creating = browser.tabs.create({
            'active': true,
            'url': 'http://example.com/' + url
        });
    } catch (error) {
        try {
            var creating = browser.tabs.create(
                { url: 'http://example.com/' + url, active: true }
            );
        } catch (error) {
            console.log.error(error);
        }
    }
}

chrome.contextMenus.create({
    id: "send-url",
    title: "Send URL to ..",
    contexts: ["all"]
}, function () { console.log('Added context item send-url'); });

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "send-url":
            console.log("sending url");
            sendURL();
            break;
    }
});