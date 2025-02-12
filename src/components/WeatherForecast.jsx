import React from 'react';

const WeatherForecast = ({ date, weatherData, weatherIcons, loading }) => (
  <>
    <div key={date} className="card mt-12 elevation-2 mx-8">
      <div className="card-body table-responsive">
        <p className="font-bold text-lg mb-2">{date}</p>
        <table className="table table-bordered border-top text-center">
          <thead>
            <tr>
              <th className="bg-info w-16 2xl:w-32">時間</th>
              {weatherData.map((item, idx) => (
                <th
                  className="text-center align-middle w-12 2xl:w-16"
                  key={idx}
                >
                  {parseInt(item['日時'].split(' ')[1].split(':')[0], 10)}時
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="bg-info">天気</th>
              {weatherData.map((item, idx) => (
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
              {weatherData.map((item, idx) => (
                <td className="p-0 text-center align-middle" key={idx}>
                  {Math.trunc(parseFloat(item['気温 (℃)']) * 10) / 10}
                </td>
              ))}
            </tr>
            <tr>
              <th className="bg-info">湿度 (%)</th>
              {weatherData.map((item, idx) => (
                <td className="p-0 text-center align-middle" key={idx}>
                  {item['湿度 (%)']}
                </td>
              ))}
            </tr>
            <tr>
              <th className="bg-info">風速 (m/s)</th>
              {weatherData.map((item, idx) => (
                <td className="p-0 text-center align-middle" key={idx}>
                  {Math.trunc(parseFloat(item['風速 (m/s)']) * 10) / 10}
                </td>
              ))}
            </tr>
            <tr>
              <th className="bg-info">降水量 (mm)</th>
              {weatherData.map((item, idx) => (
                <td className="p-0 text-center align-middle" key={idx}>
                  {Math.trunc(parseFloat(item['降水量 (mm)']) * 10) / 10}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      )}
    </div>
  </>
);

export default WeatherForecast;
