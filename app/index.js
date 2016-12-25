const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const menu = require('./menu')

let mainWindow;

app.on('ready', function () {

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    titleBarStyle: 'hidden'
  })
  mainWindow.loadURL('http://mixerbox.com')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  menu();
}
)

app.on('window-all-closed', function () {
  app.quit();
})
