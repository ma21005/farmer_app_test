import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './components/Home';
import LeafletMap from './components/LeafletMap';
import WeatherPage from './components/WeatherPage';
import SideMenu from './components/SideMenu';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SideMenu />}>
          {/* サイドメニューが共通表示されるルート */}
          <Route path="farmer_app_test" element={<Home />} />
          <Route path="leaflet" element={<LeafletMap />} />
          <Route path="weather" element={<WeatherPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
