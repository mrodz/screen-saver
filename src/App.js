import './App.css'
import Clock from './Clock'
import { createTheme, ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button'
import { grey } from '@mui/material/colors'

function App() {
	const theme = createTheme({
		palette: {
			primary: grey
		}
	})

	return (
		<div className="App">
			<Clock />
			<ThemeProvider theme={theme}>
				<Button variant='contained' sx={{
					marginTop: '5rem',
					width: '20%',
					alignSelf: 'center',
				}} onClick={() => window.electron.exit()}>Start Working</Button>
			</ThemeProvider>
		</div>
	)
}

export default App
