import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/leaflet");
  };

  return (
    <div className="App flex justify-center items-center" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="flex justify-center items-center">
        <button
          onClick={handleClick}
          className="bg-[#444444] text-white p-2 rounded mb-4 hover:bg-[#777777] rounded-xl"
        >
          Leaflet
        </button>
      </div>
    </div>
  );
}

export default App;
