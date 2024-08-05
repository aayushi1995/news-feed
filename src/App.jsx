
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import HomePage from './Pages/HomePage/HomePage'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import ErrorBoundary from './Error/ErrorBoundary';


const theme = createTheme({});

function App() {
  return (
    <ErrorBoundary>
      <MantineProvider theme={theme}>
          <Notifications />
          <HomePage/>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default App
