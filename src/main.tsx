import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {ThemeProvider} from "@/Components/ui/ThemeProvider";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
