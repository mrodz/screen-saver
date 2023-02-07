const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron')
const { createAppWindow, getMainWindow, getSplashWindow } = require('./app-process')

const showWindow = async () => {
	createAppWindow()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow)
app.on('ready', () => {
	ipcMain.handle('main:remove-splash-screen', () => {
		getSplashWindow().hide()
		getMainWindow().show()
	})

	ipcMain.handle('main:exit', () => {
		app.quit()
	})

	// ipcMain.on("fullscreenon", () => {
	// 	getMainWindow().setAlwaysOnTop(true, 'screen-saver');
	// 	getMainWindow().setFullScreen(true);
	// })
	// //The order of the commands is important below
	// //don't setAlwaysOnTop() before getting out of fullscreen.
	// ipcMain.on("fullscreenoff", () => {
	// 	getMainWindow().setFullScreen(false);
	// 	getMainWindow().setAlwaysOnTop(true, 'floating')
	// })

	// ipcMain.handle('auth:get-profile', authService.getProfile)
	// ipcMain.handle('api:get-private-data', apiService.getPrivateData)
	// ipcMain.on('auth:log-out', () => {
	// 	for (const window of BrowserWindow.getAllWindows()) {
	// 		window.close()
	// 	}
	// 	createLogoutWindow()
	// })

	showWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		showWindow()
	}
})