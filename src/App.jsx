
import { createTheme, MantineProvider } from '@mantine/core';
import HomePage from './Pages/HomePage/HomePage'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <HomePage/>
    </MantineProvider>
  )
}

export default App
