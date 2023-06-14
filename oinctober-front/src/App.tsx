import React from 'react';
import './_css/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Contacts from './components/Contacts'
import Portfolio from './components/Portfolio';
import Register from './components/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import "./context/Context";
import { AuthProvider } from './context/Context';

function App() {
  const location = useLocation();
  const excludeNavFoot = ['/login', '/cadastro']

  return (
    <AuthProvider>
      <div className='main'>
        {excludeNavFoot.includes(location.pathname) ? null : <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cadastro" element={<Register />}></Route>
          <Route path={"/"} element={<Home />}/>
          <Route path="/sobre" element={<About />}></Route>
          <Route path="/contatos" element={<Contacts />}/>
          <Route path="/portfolio" element={<Portfolio />}></Route>
        </Routes>
        {excludeNavFoot.includes(location.pathname) ? null : <Footer />}
      </div>
    </AuthProvider>
  )
}

export default App;
