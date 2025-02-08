import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bulma';
import { App } from './App'
import {Route, HashRouter as Router, Routes} from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import { store } from './redux/store'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductPage'
import { Aside } from './pages/Aside'
import { AboutUsPage } from './pages/AboutUsPage'
import { Provider } from 'react-redux';
import { SelectedCoffee } from './pages/SelectedCoffee';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<HomePage />} /> 
              <Route path='menu' element={<ProductsPage />} />
              <Route path='aside' element={<Aside />} />
              <Route path='about-us' element={<AboutUsPage />} />
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