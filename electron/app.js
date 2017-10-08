const {
    app,
    BrowserWindow,
    Menu
} = require('electron')

app.on('ready', () => {
    const main = new BrowserWindow()
    main.loadURL(`${__dirname}/../index.html`)
    main.setMenu(null)
})

app.on('window-all-closed', () => app.quit())

Menu.setApplicationMenu(new Menu())