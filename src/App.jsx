import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './pages/home';
import Spectators from './pages/spectators';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competitors" element={<h1>Competitors</h1>} />
          <Route path="/spectators" element={<Spectators />} />
          <Route path="/past-events" element={<h1>Past Events</h1>} />
          <Route path="/our-history" element={<h1>About Us</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;