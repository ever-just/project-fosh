# 🔐 API Key Manager - Chrome Extension (Project Fosh)

A secure and user-friendly Chrome extension for storing and managing your API keys with a beautiful modern interface.

🌐 **[Privacy Policy](https://keymanager.dev/privacy/)** | 📦 **[GitHub Repository](https://github.com/ever-just/project-fosh)**

## ✨ Features

- **Secure Storage**: API keys are stored locally using Chrome's secure storage API
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Easy Management**: Add, edit, delete, and search through your API keys
- **Quick Copy**: One-click copying to clipboard
- **Search Function**: Quickly find API keys by name or description
- **Data Privacy**: All data stays on your device - no cloud storage
- **Masked Display**: API keys are partially hidden for security
- **Responsive Design**: Works perfectly on all screen sizes

## 🚀 Installation

### Method 1: Load as Unpacked Extension (Developer Mode)

1. **Download or Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top-right corner
4. **Click "Load unpacked"** and select the folder containing the extension files
5. **Pin the extension** to your toolbar for easy access

### Method 2: Create Extension Package

1. **Zip all files** in the extension directory
2. **Rename** the zip file to have a `.crx` extension
3. **Drag and drop** the `.crx` file into Chrome's extensions page

## 🎯 Usage

### Adding an API Key

1. **Click the extension icon** in your Chrome toolbar
2. **Click "Add New API Key"** button
3. **Fill in the details**:
   - **Name**: A memorable name for your API key (e.g., "OpenAI", "GitHub")
   - **Value**: The actual API key value
   - **Description**: Optional description for additional context
4. **Click "Save"** to store the API key

### Managing API Keys

- **Copy**: Click the "📋 Copy" button to copy the API key to your clipboard
- **Edit**: Click the "✏️ Edit" button to modify the API key details
- **Delete**: Click the "🗑️ Delete" button to remove an API key (with confirmation)
- **Search**: Use the search bar to quickly find specific API keys

### Security Features

- **Masked Display**: API keys are shown with only the first 4 and last 4 characters visible
- **Local Storage**: All data is stored locally on your device using Chrome's secure storage API
- **No Network Requests**: The extension doesn't send any data over the internet

## 🛠️ Development

### File Structure

```
project-fosh/
├── manifest.json          # Extension manifest
├── popup.html             # Main UI
├── popup.css              # Styling
├── popup.js               # Functionality
├── background.js          # Service worker
└── README.md              # Documentation
```

### Technologies Used

- **HTML5** for structure
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Vanilla JavaScript** for functionality
- **Chrome Extensions API** for storage and clipboard access

### Permissions

The extension requires minimal permissions:
- **storage**: To save API keys locally
- **clipboardWrite**: To copy API keys to clipboard

### Testing

1. **Load the extension** in developer mode
2. **Test all features**:
   - Adding new API keys
   - Editing existing keys
   - Deleting keys
   - Searching functionality
   - Copying to clipboard
3. **Check browser console** for any errors

## 🔒 Security & Privacy

- **Local Storage Only**: All API keys are stored locally on your device
- **No Cloud Sync**: Data never leaves your computer
- **Encrypted Storage**: Uses Chrome's secure storage API
- **No Analytics**: No tracking or data collection
- **No Network Access**: Extension doesn't connect to the internet

## 🎨 Customization

### Modifying the UI

You can customize the appearance by editing `popup.css`:
- **Colors**: Update the gradient backgrounds and color variables
- **Layout**: Modify spacing, sizing, and positioning
- **Animations**: Adjust transition timings and effects

### Adding Features

Common enhancements you might want to add:
- **Categories/Tags**: Group API keys by service type
- **Export/Import**: Backup and restore functionality
- **Encryption**: Additional encryption layer
- **Autofill**: Automatically fill API keys in web forms

## 📝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 🐛 Troubleshooting

### Common Issues

**Extension not loading:**
- Ensure all files are in the same directory
- Check that manifest.json is valid JSON
- Enable Developer Mode in Chrome

**API keys not saving:**
- Check browser console for errors
- Ensure storage permission is granted
- Try disabling other extensions temporarily

**Copy function not working:**
- Ensure clipboardWrite permission is granted
- Try on a different website (some sites block clipboard access)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

If you encounter any issues or have suggestions for improvements, please:
1. **Check** the troubleshooting section above
2. **Search** existing issues on GitHub
3. **Create** a new issue with detailed information

---

**Made with ❤️ for developers who need secure API key management**

## 🌐 Links

- **Website**: [https://keymanager.dev](https://keymanager.dev)
- **Privacy Policy**: [https://keymanager.dev/privacy/](https://keymanager.dev/privacy/)
- **GitHub Repository**: [https://github.com/ever-just/project-fosh](https://github.com/ever-just/project-fosh)
- **Report Issues**: [GitHub Issues](https://github.com/ever-just/project-fosh/issues)

## 📄 Privacy & Security

Project Fosh is designed with privacy as a core principle:
- ✅ **100% Local Storage** - All data stays on your device
- ✅ **No Cloud Sync** - Never transmits data over the internet  
- ✅ **No Tracking** - Zero analytics or user monitoring
- ✅ **Open Source** - Code is fully transparent and auditable
- ✅ **Minimal Permissions** - Only requires storage and clipboard access

Read our full [Privacy Policy](https://keymanager.dev/privacy/) for complete details. 