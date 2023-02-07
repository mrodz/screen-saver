import './App.css'
import { Button } from '@mui/material'

function App() {
	return (
		<div className="App">
			<Button onClick={() => window.electron.exit()}>Close App</Button>
		</div>
	)
}

export default App
