import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherForecast from './WeatherForecast';
import AiMessage from './AiMessage';
import 'admin-lte/dist/css/adminlte.min.css';

// 天気に対応するアイコン画像のパスを設定
const weatherIcons = {
  晴天: '/farmer_app_test/img/weather/晴れ.png',
  // : '/farmer_app_test/img/weather/快晴.png',
  雲: '/farmer_app_test/img/weather/曇り.png',
  曇りがち: '/farmer_app_test/img/weather/曇り.png',
  薄い雲: '/farmer_app_test/img/weather/曇り雲.png',
  厚い雲: '/farmer_app_test/img/weather/厚い雲.png',
  小雨: '/farmer_app_test/img/weather/小雨.png',
  適度な雨: '/farmer_app_test/img/weather/雨.png',
  // : '/farmer_app_test/img/weather/大雨.png',
  小雪: '/farmer_app_test/img/weather/雪.png',
  雪: '/farmer_app_test/img/weather/吹雪.png',
};

function WeatherDashboard() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // APIの気象データを取得できるまでの間にローディングアニメーションを出すための空データ
  const [weatherData, setWeatherData] = useState({
    [formatDate(today)]: [
      { 日時: `${formatDate(today)} 0:00:00` },
      { 日時: `${formatDate(today)} 3:00:00` },
      { 日時: `${formatDate(today)} 6:00:00` },
      { 日時: `${formatDate(today)} 9:00:00` },
      { 日時: `${formatDate(today)} 12:00:00` },
      { 日時: `${formatDate(today)} 15:00:00` },
      { 日時: `${formatDate(today)} 18:00:00` },
      { 日時: `${formatDate(today)} 21:00:00` },
    ],
    [formatDate(tomorrow)]: [
      { 日時: `${formatDate(tomorrow)} 0:00:00` },
      { 日時: `${formatDate(tomorrow)} 3:00:00` },
      { 日時: `${formatDate(tomorrow)} 6:00:00` },
      { 日時: `${formatDate(tomorrow)} 9:00:00` },
      { 日時: `${formatDate(tomorrow)} 12:00:00` },
      { 日時: `${formatDate(tomorrow)} 15:00:00` },
      { 日時: `${formatDate(tomorrow)} 18:00:00` },
      { 日時: `${formatDate(tomorrow)} 21:00:00` },
    ],
  });
  const [loading, setLoading] = useState(true);
  const API_URL =
    'https://script.google.com/macros/s/AKfycbzPQmWRYosRKunZCmt_LoD8ZCOfRUGCQOGFZvhxT9-hh3Y52um9jd0aK2N5842ZL6ZXAA/exec';

  // APIからデータを取得し、日付ごとにグループ化する
  // { "2025/02/11": [
  //     { "日時": "2025/02/11 0:00:00", .. "降水量 (mm)": "0" }.
  //     { "日時": "2025/02/11 3:00:00", .. "降水量 (mm)": "0" },
  //     ...
  //   ],
  //   "2025/02/12": [
  //     { "日時": "2025/02/12 0:00:00", .. "降水量 (mm)": "0" }.
  //     { "日時": "2025/02/12 3:00:00", .. "降水量 (mm)": "0" },
  //     ...
  //   ]
  // }
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const groupedData = data.reduce((acc, item) => {
          const dateKey = item['日時'].split(' ')[0];
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(item);
          return acc;
        }, {});
        setWeatherData(groupedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('データ取得エラー:', error);
      });
  }, []);

  return (
    <div className="w-full pr-24 pl-24">
      <div className="weather-container d-flex justify-content-center gap-10">
        {Object.keys(weatherData).map((date, index) => (
          <WeatherForecast
            key={index}
            date={date}
            weatherData={weatherData[date]}
            weatherIcons={weatherIcons}
            loading={loading}
          />
        ))}
      </div>

      <div className="ai-message-container mt-4">
        <AiMessage />
      </div>
    </div>
  );
}

export default WeatherDashboard;
