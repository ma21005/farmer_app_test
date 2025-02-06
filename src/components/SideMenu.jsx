import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* サイドメニュー */}
      <aside className="bg-gray-800 text-white w-64 h-full flex-shrink-0">
        <div className="p-4">
          <button
            className="text-lg font-semibold block mb-4"
            onClick={() => navigate('/farmer_app_test')}
          >
            My Dashboard
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => navigate('/leaflet')}
              >
                <i className="fas fa-map mr-2"></i>Leaflet
              </button>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => navigate('/weather')}
              >
                <i className="fas fa-cloud mr-2"></i>Weather
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <div className="flex-1 bg-[#f0efef] overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SideMenu;
