import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactSystem from './components/ContactSystem';
import Home from './pages/Home';
import EventsPage from './pages/EventsPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<EventsPage />} />
          </Routes>
        </main>
        <Footer />
        <ContactSystem />
      </div>
    </Router>
  );
}

export default App;
