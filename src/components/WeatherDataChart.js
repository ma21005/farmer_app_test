import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const WeatherDataChart = ({
  title,
  dataKeyPrefix,
  combinedData,
  windowSize,
  ticks,
  filteredYears,
  yearAndColors,
  years,
  visibleYears,
  handleYearToggle,
  yAxisDomain,
  unit
}) => {
  return (
    <div className="border-2 m-4 rounded-3xl">
      <h1 className="font-bold m-2 text-2xl">{title}</h1>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div>
          <LineChart width={windowSize.width * 0.9} height={400} data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              ticks={ticks}
              domain={["01-01", "12-31"]}
              allowDataOverflow={true}
            />
            <YAxis 
              unit={unit}
              domain={yAxisDomain}
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
        </div>
        <div style={{ width: windowSize.width * 0.05 }} className="ml-5">
          {years.map(year => (
            <div className="h-6" key={year} style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={visibleYears[year]}
                  onChange={() => handleYearToggle(year)}
                  style={{ marginRight: '5px' }}
                />
                <span style={{ color: yearAndColors[year] }}>
                  {year}年
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDataChart;
