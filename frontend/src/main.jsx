import React from 'react'
import ReactDOM from 'react-dom/client'
import LayoutMain from './LayoutMain'
import LayoutExchange from './LayoutExchange'
import Home from './pages/Home'
import About from './pages/About'
import NoPage from './pages/NoPage'
import Swap from './pages/Swap'
import Pool from './pages/Pool'
import Onboarding from './pages/Onboarding'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/app" element={<LayoutExchange />}>
          <Route index element={<Onboarding />} />
          <Route path="swap" element={<Swap />} />
          <Route path="pool" element={<Pool />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
