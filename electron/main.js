const { app, BrowserWindow } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 550,
    resizable: true,
    webPreferences: {
      nodeIntegration: true, // enable Node.js integration
      contextIsolation: false, // disable context isolation
    },
  });

  // load the index.html file
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
