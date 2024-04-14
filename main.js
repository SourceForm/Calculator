const { app, BrowserWindow } = require('electron');

// Function to create the main window
function createMainWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true // Enable Node.js integration in renderer process
        }
    });

    // Load the HTML file of your renderer process
    mainWindow.loadFile('index.html')
        .then(() => {
            // Successfully loaded the HTML file
            console.log('HTML file loaded successfully');
        })
        .catch((error) => {
            // Error occurred while loading the HTML file
            console.error('Error loading HTML file:', error);
        });

    // Remove when done with development
    mainWindow.webContents.openDevTools();

    // Handle window close event
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Listen for the app to be ready
app.on('ready', createMainWindow);
