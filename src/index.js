import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
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
          <Route path="farmer_app_test" element={<App />} />
          <Route path="leaflet" element={<LeafletMap />} />
          <Route path="weather" element={<WeatherPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
