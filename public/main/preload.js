const { contextBridge, ipcRenderer, app } = require('electron')

process.once('loaded', () => {
	contextBridge.exposeInMainWorld('electron', {
		signalClose: () => ipcRenderer.invoke('main:remove-splash-screen'),
		exit: () => ipcRenderer.invoke('main:exit'),
	})
	contextBridge.exposeInMainWorld('versions', {
		node: () => process.versions.node,
		chrome: () => process.versions.chrome,
		electron: () => process.versions.electron,
	})
})