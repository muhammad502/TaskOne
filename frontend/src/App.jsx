import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Corrected import
import RegistrationPage from './pages/registration/registration';
import Filtertable from './pages/filterTable/filtertable';
import Login from './pages/login/login';
import '../components/menu.css'

function App() {
  return (
    <Router>  
      <div>
        <nav>
          <ul>
            <li><Link to="/">RegistrationPage</Link></li>
            <li><Link to="/Filtertable">Filtertable</Link></li> 
            <li><Link to="/Login">Login</Link></li> 
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/Filtertable" element={<Filtertable />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
