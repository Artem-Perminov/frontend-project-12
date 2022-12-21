import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Notfound from './components/pages/Notfound';
import Header from './components/Header';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </>
);

export default App;
