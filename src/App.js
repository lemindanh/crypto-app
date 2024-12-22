import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CoinPage from "./pages/Coin";
import Homepage from './pages/Home';
import DashboardPage from './pages/Dashpoard';
import ComparePage from './pages/ComparePage';
import Watchlist from './pages/Watchlist';
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <div className="App">
      <div className="cursor" id="cursor" />
      <div className="cursor-pointer" id="cursor-pointer" />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/coin/:id' element={<CoinPage />} />
          <Route path='/compare' element={<ComparePage />} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
