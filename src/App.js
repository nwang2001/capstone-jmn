import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import Event from './Pages/Event';
import Map from './Pages/Map';
import Account from './Pages/Account';
import Admin from './Pages/Admin'
import Footer from './Components/Footer';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Recipe from './Pages/Recipe';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Account' element={<Account />} />
          <Route path='/Recipe' element={<Recipe />} />
          <Route path='/Admin' element={<Admin />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
