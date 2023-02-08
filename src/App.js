import './App.css'
import { Button } from '@mui/material'
import Clock from './Clock'

function App() {
	return (
		<div className="App">
			<Button onClick={() => window.electron.exit()}>Close App</Button>
			<Clock />
		</div>
	)
}

export default App
