import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';

// 天気に対応するアイコン画像のパスを設定
const weatherIcons = {
  晴天: '/farmer_app_test/img/weather/晴れ.png',
  // : '/farmer_app_test/img/weather/快晴.png',
  雲: '/farmer_app_test/img/weather/曇り.png',
  曇りがち: '/farmer_app_test/img/weather/曇り.png',
  厚い雲: '/farmer_app_test/img/weather/厚い雲.png',
  小雨: '/farmer_app_test/img/weather/小雨.png',
  適度な雨: '/farmer_app_test/img/weather/雨.png',
  // : '/farmer_app_test/img/weather/大雨.png',
  小雪: '/farmer_app_test/img/weather/雪.png',
};

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState({});
  // const [loading, setLoading] = useState(true);
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
        // setLoading(false);
      })
      .catch((error) => {
        console.error('データ取得エラー:', error);
        // setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="weather-container">
        <div className="d-flex">
          {Object.keys(weatherData).map((date, index) => (
            <div key={index} className="card m-2 elevation-2">
              <div className="card-body">
                <h5 className="card-title text-center">{date}</h5>
                <table className="table table-bordered border-top text-center">
                  <thead>
                    <tr>
                      <th className="bg-info w-16 2xl:w-32">時間</th>
                      {weatherData[date].map((item, idx) => (
                        <th className="w-12 2xl:w-16" key={idx}>
                          {parseInt(
                            item['日時'].split(' ')[1].split(':')[0],
                            10
                          )}
                          時
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="bg-info">天気</th>
                      {weatherData[date].map((item, idx) => (
                        <td className="p-0 text-center align-middle" key={idx}>
                          <img
                            src={weatherIcons[item['天気']]}
                            alt={item['天気']}
                            className="w-100"
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="bg-info">気温 (℃)</th>
                      {weatherData[date].map((item, idx) => (
                        <td key={idx}>
                          {Math.trunc(parseFloat(item['気温 (℃)']) * 10) / 10}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="bg-info">湿度 (%)</th>
                      {weatherData[date].map((item, idx) => (
                        <td key={idx}>{item['湿度 (%)']}</td>
                      ))}
                    </tr>
                    <tr>
                      <th className="bg-info">風速 (m/s)</th>
                      {weatherData[date].map((item, idx) => (
                        <td key={idx}>
                          {Math.trunc(parseFloat(item['風速 (m/s)']) * 10) / 10}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="bg-info">降水量 (mm)</th>
                      {weatherData[date].map((item, idx) => (
                        <td key={idx}>
                          {Math.trunc(parseFloat(item['降水量 (mm)']) * 10) /
                            10}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
