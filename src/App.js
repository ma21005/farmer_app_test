import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleLeafletClick = () => {
    navigate('/leaflet');
  };

  const handleWeatherClick = () => {
    navigate('/weather');
  };

  return (
    <div
      className="App flex justify-center items-center"
      style={{ backgroundColor: 'white', minHeight: '100vh' }}
    >
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={handleLeafletClick}
          className="bg-[#444444] text-white p-2 rounded mb-4 hover:bg-[#777777] rounded-xl"
        >
          Leaflet
        </button>
        <button
          onClick={handleWeatherClick}
          className="bg-[#444444] text-white p-2 rounded mb-4 hover:bg-[#777777] rounded-xl"
        >
          Weather
        </button>
      </div>
    </div>
  );
}

export default App;
