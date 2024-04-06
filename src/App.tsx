import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { About, Contact, Hero, Navbar, Works, StarsCanvas } from './components';
import { useEffect } from 'react';
import { config } from './constants/config';
import Generate from './components/Generate.tsx';

const App = () => {
  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/generate" element={<Generate/>} />
        <Route
          path="/"
          element={
            <div className="bg-primary relative z-0">
              <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
                <Navbar />
                <Hero />
              </div>
              <About />
              <Works />
              <div className="relative z-0">
                <Contact />
                <StarsCanvas />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
