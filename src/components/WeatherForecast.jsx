import React from 'react';

const WeatherForecast = ({ date, weatherData, weatherIcons, loading }) => (
  <>
    <div key={date} className="card mt-12 elevation-2 w-full">
      <div
        className="card-header"
        style={{ backgroundColor: '#209e91', color: '#ffffff' }}
      >
        <h1 className="font-bold text-lg m-0">{date}</h1>
      </div>
      <div className="card-body table-responsive">
        {/* <p className="font-bold text-lg mb-2">{date}</p> */}
        <table className="table table-bordered border-top text-center">
          <thead>
            <tr>
              <th className="bg-[#1f2937] text-white font-medium w-16 2xl:w-32">
                時間
              </th>
              {weatherData.map((item, idx) => (
                <th
                  className="text-center align-middle font-medium w-12 2xl:w-16 bg-[#1f2937] text-white"
                  key={idx}
                >
                  {parseInt(item['日時'].split(' ')[1].split(':')[0], 10)}時
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="bg-[#1f2937] text-white font-medium">天気</th>
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
              <th className="bg-[#1f2937] text-white font-medium">気温 (℃)</th>
              {weatherData.map((item, idx) => {
                const temperature = loading
                  ? null
                  : Math.trunc(parseFloat(item['気温 (℃)']) * 10) / 10;
                return (
                  <td
                    className={`p-0 text-center align-middle font-bold ${
                      temperature < 0 ? 'text-blue-400' : 'text-gray-500'
                    }`}
                    key={idx}
                  >
                    {temperature}
                  </td>
                );
              })}
            </tr>
            <tr>
              <th className="bg-[#1f2937] text-white font-medium">湿度 (%)</th>
              {weatherData.map((item, idx) => {
                const humidity = loading
                  ? null
                  : parseInt(item['湿度 (%)'], 10);
                return (
                  <td
                    className={`p-0 text-center align-middle font-bold ${
                      humidity >= 85 ? 'text-orange-400' : 'text-gray-500'
                    }`}
                    key={idx}
                  >
                    {humidity}
                  </td>
                );
              })}
            </tr>
            <tr>
              <th className="bg-[#1f2937] text-white font-medium">
                風速 (m/s)
              </th>
              {weatherData.map((item, idx) => {
                const windSpeed = loading
                  ? null
                  : Math.trunc(parseFloat(item['風速 (m/s)']) * 10) / 10;
                return (
                  <td
                    className={`p-0 text-center align-middle font-bold ${
                      windSpeed >= 7 ? 'text-green-500' : 'text-gray-500'
                    }`}
                    key={idx}
                  >
                    {windSpeed}
                  </td>
                );
              })}
            </tr>

            <tr>
              <th className="bg-[#1f2937] text-white font-medium">
                降水量 (mm)
              </th>
              {weatherData.map((item, idx) => (
                <td
                  className="p-0 text-center align-middle font-bold text-gray-500"
                  key={idx}
                >
                  {loading
                    ? ''
                    : Math.trunc(parseFloat(item['降水量 (mm)']) * 10) / 10}
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
