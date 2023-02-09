const { BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

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
		}
	})

	mainWindow.setAlwaysOnTop(true, 'screen-saver')
	splashWindow.setAlwaysOnTop(true, 'pop-up-menu')
	mainWindow.autoHideMenuBar = true
	mainWindow.on('close', () => { // closing the main window should close all other windows, too.
		splashWindow?.close?.()
	})
	mainWindow.setBackgroundColor('#232222')

	splashWindow.loadFile('./public/splash.html')
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	)
}

module.exports = {
	createAppWindow,
	getMainWindow,
	getSplashWindow
}