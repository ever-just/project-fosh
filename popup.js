document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const toggleAddForm = document.getElementById('toggleAddForm');
    const addKeyForm = document.getElementById('addKeyForm');
    const saveKey = document.getElementById('saveKey');
    const cancelAdd = document.getElementById('cancelAdd');
    const keyName = document.getElementById('keyName');
    const keyValue = document.getElementById('keyValue');
    const keyDescription = document.getElementById('keyDescription');
    const keysList = document.getElementById('keysList');
    const emptyState = document.getElementById('emptyState');
    const editModal = document.getElementById('editModal');
    const closeModal = document.getElementById('closeModal');
    const updateKey = document.getElementById('updateKey');
    const deleteKey = document.getElementById('deleteKey');
    const cancelEdit = document.getElementById('cancelEdit');
    const editKeyName = document.getElementById('editKeyName');
    const editKeyValue = document.getElementById('editKeyValue');
    const editKeyDescription = document.getElementById('editKeyDescription');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    let currentEditingId = null;
    let allKeys = [];

    // Initialize
    loadKeys();

    // Event listeners
    toggleAddForm.addEventListener('click', () => {
        animateButton(toggleAddForm);
        addKeyForm.classList.toggle('hidden');
        if (!addKeyForm.classList.contains('hidden')) {
            keyName.focus();
        } else {
            clearAddForm();
        }
    });

    cancelAdd.addEventListener('click', () => {
        animateButton(cancelAdd);
        addKeyForm.classList.add('hidden');
        clearAddForm();
    });

    saveKey.addEventListener('click', () => {
        animateButton(saveKey);
        const name = keyName.value.trim();
        const value = keyValue.value.trim();
        const description = keyDescription.value.trim();

        if (!name || !value) {
            showToast('Please enter both name and value', 'error');
            return;
        }

        saveApiKey(name, value, description);
    });

    closeModal.addEventListener('click', () => {
        closeEditModal();
    });

    cancelEdit.addEventListener('click', () => {
        animateButton(cancelEdit);
        closeEditModal();
    });

    updateKey.addEventListener('click', () => {
        animateButton(updateKey);
        if (!currentEditingId) return;

        const name = editKeyName.value.trim();
        const value = editKeyValue.value.trim();
        const description = editKeyDescription.value.trim();

        if (!name || !value) {
            showToast('Please enter both name and value', 'error');
            return;
        }

        updateApiKey(currentEditingId, name, value, description);
    });

    deleteKey.addEventListener('click', () => {
        animateButton(deleteKey);
        if (!currentEditingId) return;

        const key = allKeys.find(k => k.id === currentEditingId);
        if (!key) return;

        if (confirm(`Are you sure you want to delete the API key "${key.name}"?`)) {
            deleteApiKey(currentEditingId);
        }
    });

    // Functions
    function animateButton(button) {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 300);
    }

    async function loadKeys() {
        try {
            // Check if chrome.storage is available
            if (!chrome.storage || !chrome.storage.local) {
                throw new Error('Chrome storage API not available');
            }
            
            const result = await chrome.storage.local.get(['apiKeys']);
            allKeys = result.apiKeys || [];
            renderKeys(allKeys);
            console.log('Keys loaded successfully:', allKeys.length, 'keys found');
        } catch (error) {
            console.error('Error loading keys:', error);
            showToast('Error loading keys: ' + error.message, 'error');
        }
    }

    async function saveApiKey(name, value, description) {
        try {
            const newKey = {
                id: Date.now().toString(),
                name,
                value,
                description,
                createdAt: new Date().toISOString()
            };

            allKeys.push(newKey);
            await chrome.storage.local.set({ apiKeys: allKeys });
            
            renderKeys(allKeys);
            clearAddForm();
            addKeyForm.classList.add('hidden');
            showToast('API key saved successfully!');
        } catch (error) {
            console.error('Error saving key:', error);
            showToast('Error saving key', 'error');
        }
    }

    async function updateApiKey(id, name, value, description) {
        try {
            const keyIndex = allKeys.findIndex(key => key.id === id);
            if (keyIndex === -1) return;

            allKeys[keyIndex] = {
                ...allKeys[keyIndex],
                name,
                value,
                description,
                updatedAt: new Date().toISOString()
            };

            await chrome.storage.local.set({ apiKeys: allKeys });
            renderKeys(allKeys);
            closeEditModal();
            showToast('API key updated successfully!');
        } catch (error) {
            console.error('Error updating key:', error);
            showToast('Error updating key', 'error');
        }
    }

    async function deleteApiKey(id) {
        try {
            allKeys = allKeys.filter(key => key.id !== id);
            await chrome.storage.local.set({ apiKeys: allKeys });
            renderKeys(allKeys);
            closeEditModal();
            showToast('API key deleted successfully!');
        } catch (error) {
            console.error('Error deleting key:', error);
            showToast('Error deleting key', 'error');
        }
    }

    function renderKeys(keys) {
        if (keys.length === 0) {
            keysList.innerHTML = `
                <div id="emptyState" class="empty-state">
                    <div class="empty-icon">🗂️</div>
                    <p>No API keys stored yet</p>
                    <p class="empty-subtitle">Click the + button to get started</p>
                </div>
            `;
            return;
        }

        keysList.innerHTML = keys.map(key => `
            <div class="key-item" data-key-id="${key.id}">
                <div class="key-header">
                    <div class="key-name">${escapeHtml(key.name)}</div>
                    <div class="key-actions">
                        <button class="btn btn-copy" data-action="copy" data-value="${escapeHtml(key.value)}">
                            Copy
                        </button>
                        <button class="btn btn-edit" data-action="edit" data-key-id="${key.id}">
                            Edit
                        </button>
                    </div>
                </div>
                <div class="key-value">${maskApiKey(key.value)}</div>
                ${key.description ? `<div class="key-description">${escapeHtml(key.description)}</div>` : ''}
            </div>
        `).join('');
    }

    function maskApiKey(key) {
        if (key.length <= 8) {
            return '*'.repeat(key.length);
        }
        return key.substring(0, 4) + '*'.repeat(Math.min(20, key.length - 8)) + key.substring(key.length - 4);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function clearAddForm() {
        keyName.value = '';
        keyValue.value = '';
        keyDescription.value = '';
    }

    function closeEditModal() {
        editModal.classList.add('hidden');
        currentEditingId = null;
        editKeyName.value = '';
        editKeyValue.value = '';
        editKeyDescription.value = '';
    }

    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2000);
    }

    // Event delegation for dynamically created buttons
    keysList.addEventListener('click', async (e) => {
        const action = e.target.dataset.action;
        
        if (action === 'copy') {
            animateButton(e.target);
            const value = e.target.dataset.value;
            try {
                // Check if clipboard API is available
                if (!navigator.clipboard) {
                    throw new Error('Clipboard API not available - try using HTTPS or newer Chrome version');
                }
                await navigator.clipboard.writeText(value);
                showToast('Copied to clipboard!');
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                showToast('Copy failed: ' + error.message, 'error');
                
                // Fallback: Try to copy using execCommand (deprecated but more compatible)
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = value;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showToast('Copied to clipboard (fallback method)!');
                } catch (fallbackError) {
                    console.error('Fallback copy also failed:', fallbackError);
                    showToast('Copy failed completely - please copy manually', 'error');
                }
            }
        }
        
        else if (action === 'edit') {
            animateButton(e.target);
            const id = e.target.dataset.keyId;
            const key = allKeys.find(k => k.id === id);
            if (!key) return;

            currentEditingId = id;
            editKeyName.value = key.name;
            editKeyValue.value = key.value;
            editKeyDescription.value = key.description || '';
            editModal.classList.remove('hidden');
            editKeyName.focus();
        }
    });

    // Handle Enter key in forms
    keyName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            keyValue.focus();
        }
    });

    keyValue.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (keyDescription) {
                keyDescription.focus();
            } else {
                saveKey.click();
            }
        }
    });

    editKeyName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            editKeyValue.focus();
        }
    });

    editKeyValue.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (editKeyDescription) {
                editKeyDescription.focus();
            } else {
                updateKey.click();
            }
        }
    });

    // Close modal when clicking outside
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
}); 