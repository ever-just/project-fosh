# 🔧 Troubleshooting Guide - API Key Manager

## Common Issues & Solutions

### ❌ **Extension Not Loading on Friend's Computer**

**Most Likely Causes:**

1. **Different Extension IDs**
   - **Problem**: Without a consistent extension key, each installation gets a different ID
   - **Solution**: ✅ **FIXED** - Added consistent extension key to manifest.json
   - **Impact**: Now all installations will have the same extension ID

2. **Chrome Storage API Not Available**
   - **Problem**: Older Chrome versions or restrictive policies
   - **Solution**: Update Chrome to latest version (minimum 88+)
   - **Check**: Open DevTools (F12) and look for storage-related errors

3. **Clipboard API Failures**
   - **Problem**: `navigator.clipboard` requires secure contexts
   - **Solution**: ✅ **FIXED** - Added fallback copy method
   - **Check**: Extension now shows specific error messages for clipboard issues

### 🛠️ **Debug Steps for Your Friend**

1. **Open Chrome DevTools:**
   ```
   1. Right-click extension icon → "Inspect popup"
   2. Check Console tab for error messages
   3. Look for red error messages about storage or clipboard
   ```

2. **Check Extension Permissions:**
   ```
   1. Go to chrome://extensions/
   2. Find "API Key Manager"
   3. Ensure it's enabled
   4. Check if any permissions are denied
   ```

3. **Test Storage Access:**
   ```
   1. Open extension popup
   2. Try adding a test API key
   3. Check browser console for storage errors
   ```

4. **Verify Chrome Version:**
   ```
   1. Go to chrome://settings/help
   2. Ensure Chrome version is 88+ (preferably 96+)
   3. Update if necessary
   ```

### 🔄 **Installation Steps**

**For Developer Mode Installation:**
1. Download/clone the repository
2. Open `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select the project-fosh folder
6. Pin the extension to toolbar

**For Package Installation:**
1. Create a `.crx` package file
2. Drag and drop into Chrome extensions page
3. Approve installation prompts

### 📊 **Extension Requirements**

- **Chrome Version**: 88+ (recommended 96+)
- **Permissions**: Storage, Clipboard Write
- **Internet**: Not required (fully local)
- **Special Setup**: None needed

### 🐛 **Common Error Messages**

| Error | Cause | Solution |
|-------|-------|----------|
| "Chrome storage API not available" | Old Chrome version | Update Chrome |
| "Clipboard API not available" | Insecure context or old Chrome | Use HTTPS or update Chrome |
| "Copy failed" | Clipboard permissions denied | Check site permissions |
| Extension icon grey/disabled | Extension not loaded properly | Reload extension |

### 🔍 **Advanced Debugging**

**Check Extension ID Consistency:**
```javascript
// Run in extension popup console
chrome.runtime.id
```
Should be the same across all installations.

**Test Storage Manually:**
```javascript
// In extension popup console
chrome.storage.local.set({test: 'hello'}, () => {
    chrome.storage.local.get(['test'], (result) => {
        console.log('Storage test:', result);
    });
});
```

### 📞 **Need More Help?**

1. Check the browser console for specific error messages
2. Try in Incognito mode to rule out other extension conflicts
3. Disable all other extensions temporarily
4. Compare Chrome versions between working and non-working computers

---

**Made with ❤️ by Project Fosh**
