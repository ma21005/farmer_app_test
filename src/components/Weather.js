import axios from "axios";
import { useState, useEffect } from "react";

const Weather = () => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  // 緯度と経度の指定
  const latitude = 35.08986398316492;
  const longitude = 133.0407160749473;

  const [weather, setWeather] = useState(null);

  const apiCall = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data.list);
    } catch (error) {
      console.error('Error has occurred:', error);
    }
  };

  useEffect(() => {
    apiCall(); // コンポーネントがマウントされたときに実行
  }, []); // 空の依存配列で初回マウント時のみ実行

  return (
    <div>
      {weather ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">3時間ごとの天気予報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weather.map((forecast, index) => {
              const date = new Date(forecast.dt * 1000);
              return (
                <div key={index} className="p-4 border rounded-lg shadow-sm">
                  <p className="font-semibold">
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                  </p>
                  <p>気温: {forecast.main.temp}°C</p>
                  {/* <p>体感温度: {forecast.main.feels_like}°C</p> */}
                  <p>最高気温: {forecast.main.temp_max}°C</p>
                  <p>最低気温: {forecast.main.temp_min}°C</p>
                  {/* <p>温度変化: {forecast.main.temp_kf}°C</p> */}
                  <p>天気: {forecast.weather[0].description}</p>
                  <p>湿度: {forecast.main.humidity}%</p>
                  <p>気圧: {forecast.main.pressure}hPa</p>
                  <p>地上気圧: {forecast.main.grnd_level}hPa</p>
                  <p>海面気圧: {forecast.main.sea_level}hPa</p>
                  <p>風速: {forecast.wind.speed}m/s</p>
                  <p>降水量: {forecast.rain?.['3h'] ?? 0}mm</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>天気データを読み込み中...</p>
      )}
    </div>
  );
};

export default Weather;
