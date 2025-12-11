import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UnitView from './pages/UnitView';
import PYQView from './pages/PYQView';
import MasterPYQView from './pages/MasterPYQView';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/unit/:id" element={<UnitView />} />
        <Route path="/pyq" element={<PYQView />} />
        <Route path="/master-pyqs" element={<MasterPYQView />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <AnimatedRoutes />
        </main>
        <footer className="p-4 text-center text-muted text-sm pb-10">
          Created by Antigravity
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
