
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Form from './pages/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPlan from './pages/Admin';


function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/admin' element={<AdminPlan />} />
      </Routes>

    </HashRouter>
  )
}

export default App
