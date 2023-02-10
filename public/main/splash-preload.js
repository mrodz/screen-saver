const { contextBridge, ipcRenderer } = require('electron')

process.once('loaded', () => {
	contextBridge.exposeInMainWorld('electron', {
		message: () => ipcRenderer.invoke('splash:get-message')
	})
})