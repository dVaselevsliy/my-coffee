import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import {Route, HashRouter as Router, Routes} from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import { store } from './redux/store'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { Aside } from './pages/Aside'
import { Provider } from 'react-redux';
import { SelectedCoffee } from './pages/SelectedCoffee';
import { ScroolMyTop } from './Components/scroolMyTop'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ScroolMyTop />
        <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<HomePage />} /> 
              <Route path='menu' element={<ProductsPage />} />
              <Route path='aside' element={<Aside />} />
              <Route path='selected-coffee'>
                <Route index element={<SelectedCoffee />}/>
                <Route path=':productId?' element={<SelectedCoffee />} />
              </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
</StrictMode>
)