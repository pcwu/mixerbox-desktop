const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const BrowserWindow = electron.BrowserWindow
const ipcMain = require('electron').ipcMain

const menu = require('./menu')

let mainWindow;

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

}
)

app.on('window-all-closed', function () {
  app.quit();
})
