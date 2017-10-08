const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

app.on('ready', () => {
    const main = new BrowserWindow()
    main.loadURL(`${__dirname}/../index.html`)
})

app.on('window-all-closed', () => app.quit())