import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import {Route, HashRouter as Router, Routes} from 'react-router-dom'
import { NotFoundPage } from './Components/Header/Header/NotFoundPage'


createRoot(document.getElementById('root')!).render(
<StrictMode>
  <Router>
    <Routes>
        <Route path='/' element={<App />}>
        <Route path='*' element={<NotFoundPage />} />
      </Route>    
    </Routes>
  </Router>
</StrictMode>
)