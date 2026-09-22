import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home';
import Competitors from './pages/competitors';
import Spectators from './pages/spectators';
import Contact from './pages/contact';
import PastEvents from './pages/past-events';
import OurHistory from './pages/our-history';
import { ContentProvider, useContentState } from './content/ContentContext';

function AppShell() {
  const { status, error, reload } = useContentState();

  if (status === 'loading') {
    return (
      <div className="site-loading" role="status">
        <p>Loading Mustang Ball&hellip;</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="site-loading site-loading-error" role="alert">
        <p>Something went wrong loading the site. {error?.message}</p>
        <button type="button" className="btn" onClick={reload}>Try again</button>
      </div>
    );
  }

  return (
    <div className="App">
      <ScrollToTop />
      <header className="site-header">
        <TopBar />
        <NavBar />
      </header>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competitors" element={<Competitors />} />
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

export default function PublicSite() {
  return (
    <ContentProvider>
      <AppShell />
    </ContentProvider>
  );
}
