// Background service worker for API Key Manager
chrome.runtime.onInstalled.addListener(() => {
    console.log('API Key Manager extension installed');
    
    // Initialize storage if needed
    chrome.storage.local.get(['apiKeys'], (result) => {
        if (!result.apiKeys) {
            chrome.storage.local.set({ apiKeys: [] });
        }
    });
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup automatically due to default_popup in manifest
    console.log('Extension icon clicked');
});

// Optional: Listen for storage changes (useful for debugging)
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.apiKeys) {
        console.log('API keys updated:', changes.apiKeys.newValue?.length || 0, 'keys stored');
    }
});

// Optional: Handle context menu (future feature)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getKeys') {
        chrome.storage.local.get(['apiKeys'], (result) => {
            sendResponse({ keys: result.apiKeys || [] });
        });
        return true; // Will respond asynchronously
    }
    
    if (request.action === 'saveKey') {
        chrome.storage.local.get(['apiKeys'], (result) => {
            const keys = result.apiKeys || [];
            keys.push(request.key);
            chrome.storage.local.set({ apiKeys: keys }, () => {
                sendResponse({ success: true });
            });
        });
        return true; // Will respond asynchronously
    }
}); 