import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

const SideMenu = () => {
  useEffect(() => {
    require('admin-lte');
  }, []);

  return (
    <div className="wrapper flex h-screen overflow-hidden">
      <aside className="main-sidebar sidebar-dark-primary elevation-4 h-full flex-shrink-0">
        <div className="brand-link text-center">
          <span className="brand-text text-white">My Dashboard</span>
        </div>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
            >
              <li className="nav-item">
                <Link to="/farmer_app_test" className="nav-link">
                  <i className="nav-icon fas fa-home mr-2"></i>
                  <p>Home</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/leaflet" className="nav-link">
                  <i className="nav-icon fas fa-map mr-2"></i>
                  <p>Map</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/weather" className="nav-link">
                  <i className="nav-icon fas fa-chart-line mr-2"></i>
                  <p>Weather</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <div className="content-wrapper flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SideMenu;
