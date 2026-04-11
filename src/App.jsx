import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<h1>Welcome to Mustang Ball</h1>} />
          <Route path="/competitors" element={<h1>Competitors</h1>} />
          <Route path="/spectators" element={<h1>Spectators</h1>} />
          <Route path="/past-events" element={<h1>Past Events</h1>} />
          <Route path="/about-us" element={<h1>About Us</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;