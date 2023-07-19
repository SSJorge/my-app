import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentPage from './components/AppointmentPage';
import Home from './components/Home';
import Header from './components/Header';
import Citas from './components/Citas'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/citas" element={<Citas />} />
        <Route path="/solicitar" element={<AppointmentPage />} />
        <Route path="/" element={<Home />} />
        {/* Agrega otras rutas para diferentes páginas de tu aplicación si es necesario */}
      </Routes>
    </Router>
  );
}

export default App;