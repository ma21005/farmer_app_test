import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import LeafletMap from './components/LeafletMap';
import Weather from './components/Weather';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* ルートパスでAppをレンダリング */}
        <Route path="/farmer_app_test" element={<App />} />
        {/* /infoパスでInfoPageをレンダリング */}
        <Route path="/leaflet" element={<LeafletMap />} />
        {/* /infoパスでInfoPageをレンダリング */}
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
