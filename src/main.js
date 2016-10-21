const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const countdown = require('./countdown')
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

    mainWindow.loadURL(`file://${__dirname}/countdown.html`)

    mainWindow.on('closed', _ => {
        mainWindow = null
    })

})

ipc.on('countdown-start', _ => {
    countdown(count => {
        mainWindow.webContents.send('countdown', count)
    })
})
