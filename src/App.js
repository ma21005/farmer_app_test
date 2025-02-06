import 'admin-lte/dist/css/adminlte.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    require('admin-lte');
  }, []);

  return (
    <div className="wrapper">
      {/* メインのサイドバー */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <span className="brand-text font-weight-light">My Dashboard</span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
            >
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  onClick={() => navigate('/leaflet')}
                >
                  <i className="nav-icon fas fa-map"></i>
                  <p>Leaflet</p>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  onClick={() => navigate('/weather')}
                >
                  <i className="nav-icon fas fa-cloud"></i>
                  <p>Weather</p>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <div
        className="content-wrapper d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="text-center">
          <h1>Welcome to AdminLTE Dashboard</h1>
          <p>Select an option from the sidebar</p>
        </div>
      </div>
    </div>
  );
}

export default App;
