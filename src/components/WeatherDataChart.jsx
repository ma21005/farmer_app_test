import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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
  selectedRange,
  filterDataByMonthRange,
}) => {
  return (
    <div className="card card-info elevation-2 relative w-auto max-w-full border-2 mr-4 ml-5 mt-4 mb-4">
      <div className="card-header flex justify-between">
        <h1 className="font-bold m-1 text-2xl">{title}</h1>

        {/* 気象データの表示範囲を切り替えるボタン */}
        <div
          className="btn-group rounded-md ml-auto border-2 border-[#148CA0]"
          role="group"
        >
          {[
            { label: '1 ~ 12月', range: '01-12' },
            { label: '1 ~ 4月', range: '01-04' },
            { label: '5 ~ 8月', range: '05-08' },
            { label: '9 ~ 12月', range: '09-12' },
          ].map(({ label, range }) => (
            <button
              key={range}
              type="button"
              className={`btn btn-info`}
              style={{
                backgroundColor: selectedRange === range ? '#148CA0' : '',
                border: 'none',
              }}
              onClick={() =>
                filterDataByMonthRange(range.split('-')[0], range.split('-')[1])
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="card-body w-full flex justify-between items-start">
        <div className="w-[95%]">
          <div className="relative w-full border-2 p-4">
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

      {loading && (
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      )}
    </div>
  );
};

export default WeatherDataChart;
