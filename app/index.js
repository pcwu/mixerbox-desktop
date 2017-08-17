const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const BrowserWindow = electron.BrowserWindow
const ipcMain = require('electron').ipcMain

const menu = require('./menu')

let mainWindow;

const volumeupCode = `
  var slider = $('#volume-slider');
  var currentValue = slider.slider('value');
  var newValue = currentValue + 5;
  slider.slider({ value: newValue });
  setPlayerVolume(newValue);
`;

const volumedownCode = `
  var slider = $('#volume-slider');
  var currentValue = slider.slider('value');
  var newValue = currentValue - 5;
  slider.slider({ value: newValue });
  setPlayerVolume(newValue);
`;

app.on('ready', function () {

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false
    }
  })
  mainWindow.loadURL('http://mixerbox.com')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  menu();

  const play = globalShortcut.register('mediaplaypause', () => {
    mainWindow.webContents.executeJavaScript("playPauseClick();");
  })
  const next = globalShortcut.register('medianexttrack', () => {
    mainWindow.webContents.executeJavaScript("playNext();");
  })
  const pre = globalShortcut.register('mediaprevioustrack', () => {
    mainWindow.webContents.executeJavaScript("playPrev();");
  })

  globalShortcut.register('volumeup', () => {
    mainWindow.webContents.executeJavaScript(volumeupCode);
  })

  globalShortcut.register('volumedown', () => {
    mainWindow.webContents.executeJavaScript(volumedownCode);
  })
}
)

app.on('window-all-closed', function () {
  app.quit();
})
