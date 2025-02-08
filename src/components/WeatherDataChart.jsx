import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const WeatherDataChart = ({
  title,
  dataKeyPrefix,
  combinedData,
  ticks,
  filteredYears,
  yearAndColors,
  years,
  visibleYears,
  handleYearToggle,
  yAxisDomain,
  unit,
  loading,
}) => {
  return (
    <div className="relative w-auto max-w-full border-2 mr-4 ml-5 mt-4 mb-4 rounded-xl bg-white shadow-md">
      <div className="m-3">
        <h1 className="font-bold m-2 text-2xl">{title}</h1>
        <div className="w-full flex justify-between items-start">
          <div className="w-[95%]">
            <div className="relative w-full h-[400px]">
              {/* ローディングアニメーション */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-30 z-10">
                  <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                </div>
              )}
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={combinedData}>
                  <XAxis
                    dataKey="date"
                    ticks={ticks}
                    domain={['01-01', '12-31']}
                    allowDataOverflow={true}
                    tick={!loading} // ローディング中はX軸の値を非表示
                    axisLine={true}
                  />
                  <YAxis
                    unit={unit}
                    domain={yAxisDomain}
                    tick={!loading} // ローディング中はY軸の値を非表示
                    axisLine={true}
                  />
                  <Tooltip />
                  <Legend />
                  {filteredYears.map((year) => (
                    <Line
                      key={year}
                      type="monotone"
                      dataKey={`${dataKeyPrefix}${year}`}
                      name={`${year}年`}
                      dot={false}
                      stroke={yearAndColors[year]}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="w-[9%] 2xl:w-[6%] flex flex-col items-center">
            {years.map((year) => (
              <div className="mb-2" key={year}>
                <button
                  className="btn btn-sm text-white"
                  onClick={() => handleYearToggle(year)}
                  style={{
                    backgroundColor: visibleYears[year]
                      ? yearAndColors[year]
                      : '#6c757d',
                  }}
                >
                  {year}年
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDataChart;
