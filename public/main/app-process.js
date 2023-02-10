const { BrowserWindow, app } = require('electron')

const path = require('path')
const build = app.isPackaged

let mainWindow = null
let splashWindow = null

const getMainWindow = () => mainWindow
const getSplashWindow = () => splashWindow

async function createAppWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		title: "Landing",
		fullscreen: true,
		frame: false,
		show: true,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		},
		icon: path.join(__dirname, '/../app.ico')
	})

	splashWindow = new BrowserWindow({
		title: "Splash Screen",
		width: 200,
		height: 300,
		show: true,
		frame: false,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'splash-preload.js')
		},
		icon: path.join(__dirname, '/../app.ico')
	})

	mainWindow.setAlwaysOnTop(build, 'screen-saver')
	splashWindow.setAlwaysOnTop(true, 'screen-saver')
	mainWindow.autoHideMenuBar = true
	mainWindow.on('close', () => { // closing the main window should close all other windows, too.
		splashWindow?.close?.()
	})

	mainWindow.setBackgroundColor('#232222')
	splashWindow.setBackgroundColor('#232222')

	const buildPath = `file://${path.join(__dirname, '../../build/index.html')}`

	splashWindow.loadFile('./public/splash.html')
	mainWindow.loadURL(
		build
			? buildPath
			: 'http://localhost:3000'
	)
}

module.exports = {
	createAppWindow,
	getMainWindow,
	getSplashWindow,
	build
}