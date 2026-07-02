import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './pages/home';
import Spectators from './pages/spectators';
import Contact from './pages/contact';
import PastEvents from './pages/past-events';
import OurHistory from './pages/our-history';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competitors" element={<h1>Competitors</h1>} />
          <Route path="/spectators" element={<Spectators />} />
          <Route path="/past-events" element={<PastEvents />} />
          <Route path="/our-history" element={<OurHistory />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;