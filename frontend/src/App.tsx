import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Onboarding } from './components/Onboarding';
import { Home } from './components/Home';
import { Organize } from './components/Organize';
import { JoinRun } from './components/JoinRun';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/organize" element={<Organize />} />
        <Route path="/join" element={<JoinRun />} />
      </Routes>
    </Router>
  );
}

export default App;
