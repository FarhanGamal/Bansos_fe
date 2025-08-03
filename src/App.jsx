import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import PublicLayout from './layouts/public'
import Home from './pages/public'
import Login from './pages/auth/login'
import Types from './pages/public/Jenis'
import TypeCreate from './pages/public/Jenis/create'
import TypeEdit from './pages/public/Jenis/edit'
import Criterias from './pages/public/Kriteria'
import CriteriaCreate from './pages/public/Kriteria/create'
import CriteriaEdit from './pages/public/Kriteria/edit'
import Analisis from './pages/public/Analisis'
import Reports from './pages/public/Report'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />

          {/* Public Routes */}
          <Route element={<PublicLayout />} >
            <Route index element={<Home />} />
            {/* <Route path="type" element={<Types/>} /> */}
            
            <Route path="types">
              <Route index element={<Types />} />
              <Route path="create" element={<TypeCreate />} />
              <Route path="edit/:id" element={<TypeEdit />} />
            </Route>

            <Route path="criterias">
              <Route index element={<Criterias />} />
              <Route path="create" element={<CriteriaCreate />} />
              <Route path="edit/:id" element={<CriteriaEdit />} />
            </Route>

            <Route path="analisis">
              <Route index element={<Analisis />} />
            </Route>

            <Route path="report">
              <Route index element={<Reports />} />
            </Route>

          </Route>

          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
