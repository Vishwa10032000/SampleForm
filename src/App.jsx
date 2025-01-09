
import './App.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Form from './pages/Form'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <HashRouter>
    <Routes>
      <Route path='/' element={<Form/>} />
    </Routes>
    
    </HashRouter>
  )
}

export default App
