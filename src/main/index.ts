import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

let mainWindow: null | BrowserWindow = null

const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // nodeIntegrationInWorker: true,
      preload: path.join(__dirname, './preload.js')
    }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:1666/')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function launchAtStartup() {
  if (process.platform === 'darwin') {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true
    })
  } else {
    app.setLoginItemSettings({
      openAtLogin: true,
      openAsHidden: true,
      path: updateExe,
      args: [
        '--processStart',
        `"${exeName}"`,
        '--process-start-args',
        `"--hidden"`
      ]
    })
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
