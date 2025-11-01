import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './sections.js/Navbar';
import MainSec from './sections.js/MainSec';
import Footer from './sections.js/Footer';
import About from './NavBarSections.js/About';
import OurDrivers from './NavBarSections.js/OurDrivers';
import FavoritDrivers from './NavBarSections.js/FavoritDrivers';
import CreatCard from './NavBarSections.js/CreatCard';
import EditeCard from './NavBarSections.js/EditeCard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={
              <div>
                <Navbar />
                <MainSec />
                <Footer />
              </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/our-drivers" element={<OurDrivers />} />
            <Route path="/favorite-drivers" element={<FavoritDrivers />} />
            <Route path="/create-card" element={<CreatCard />} />
            <Route path="/edit-card/:id" element={<EditeCard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
