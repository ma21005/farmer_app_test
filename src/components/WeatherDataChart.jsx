import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
}) => {
  return (
    <div className="w-auto max-w-full border-2 mr-4 ml-5 mt-4 mb-4 rounded-xl bg-white shadow-md">
      <div className="m-3">
        <h1 className="font-bold m-2 text-2xl">{title}</h1>
        <div className="w-full flex justify-between items-start">
          <div className="w-[95%]">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  ticks={ticks}
                  domain={['01-01', '12-31']}
                  allowDataOverflow={true}
                />
                <YAxis unit={unit} domain={yAxisDomain} />
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
          <div className="w-[9%] 2xl:w-[6%] flex flex-col items-center">
            {years.map((year) => (
              <div className="h-6 mb-2" key={year}>
                <label>
                  <input
                    type="checkbox"
                    checked={visibleYears[year]}
                    onChange={() => handleYearToggle(year)}
                    className="mr-1"
                  />
                  <span style={{ color: yearAndColors[year] }}>{year}年</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDataChart;
