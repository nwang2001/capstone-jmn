import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import Event from './Pages/Event';
import Map from './Pages/Map';
import Account from './Pages/Account';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
          <Router>
        < Nav />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/Event" element= {<Event />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
