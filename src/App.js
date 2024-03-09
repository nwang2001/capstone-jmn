import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import Map from './Pages/Map';
import Account from './Pages/Account';
import Admin from './Pages/Admin'
import Footer from './Components/Footer';
import Sign from './Components/Sign';
import Login from './Components/Login';
import Recipe from './Pages/Recipe';
import Searched from './Pages/Searched';
import FullRecipe from './Pages/FullRecipe';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Account' element={<Account />} />
          <Route path='/Recipe' element={<Recipe />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/searched/:name' element={<Searched />} />
          <Route path="/recipe/:id" element={<FullRecipe />} />        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
