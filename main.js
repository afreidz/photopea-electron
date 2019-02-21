//
//    Author: Andy Freidenfelds
//
//    This is the main file that the Electron process will run. It sets up the
//    Chromium window and navigates to the start page.  It also handles
//    cleanup and stopping of the application.
//

const { app, BrowserWindow, session } = require('electron')
const startPage = 'https://www.photopea.com/'

let win
function createWindow () {
  // Hack to re-write origin for CORS requests :(
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['origin'] = 'https://www.photopea.com/'
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })

  win = new BrowserWindow({
    titleBarStyle: 'hiddenInset'
  })

  win.maximize()
  win.loadURL(startPage)
  win.on('closed', () => (win = null))
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') return app.quit()
})
app.on('activate', () => {
  if (win === null) return createWindow()
})
