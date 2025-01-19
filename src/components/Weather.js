import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Weather = () => {
  const navigate = useNavigate();
  const yearAndColors = useMemo(() => ({
    2022: '#ccca45',
    2023: '#8884d8',
    2024: '#82ca9d', 
    2025: '#ff7300'
  }), []);
  const years = useMemo(() => Object.keys(yearAndColors).map(Number), [yearAndColors]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const windowSize = useWindowSize();
  const [visibleYears, setVisibleYears] = useState(
    years.reduce((acc, year) => {
      acc[year] = true; // デフォルトで全て表示
      return acc;
    }, {})
  );

  // APIからデータを取得する関数
  const fetchWeatherData = async (year) => {
    const url = `https://script.google.com/macros/s/AKfycby_vBGwQrziUi1lCJitrHaV1oPal4i-i4yZf4grh5n76y7WNAcPaP919DGTP54soTyf8Q/exec?year=${year}`;
    const response = await axios.get(url);
    return response.data.map((entry) => ({
      date: entry["年月日"].slice(5), // "YYYY-MM-DD" の "MM-DD" 部分を抽出
      avgTemp: parseFloat(entry["平均気温(℃)"]),
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await Promise.all(
          years.map(year => fetchWeatherData(year))
        );
        const newData = years.reduce((acc, year, index) => {
          acc[year] = results[index];
          return acc;
        }, {});
        setData(newData);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [years]);

  if (loading) {
    return <div>データを読み込み中...</div>;
  }

  // 各月の1日を生成（MM-DD形式）
  const getMonthlyTicks = () => {
    const months = [
      "01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12",
    ];
    return months.map((month) => `${month}-01`);
  };

  const ticks = getMonthlyTicks();

  const combinedData = data[years[0]]?.map((d, i) => {
    const entry = { date: d.date };
    years.forEach(year => {
      entry[`temp${year}`] = data[year]?.[i]?.avgTemp;
    });
    return entry;
  }) || [];

  const handleYearToggle = (year) => {
    setVisibleYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const filteredYears = years.filter(year => visibleYears[year]);

  return (
    <div className="chart-container">
      <div className="border-2 m-4 rounded-3xl">
        <h1 className="font-bold m-2 text-2xl">平均気温</h1>
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
                unit="℃"
                domain={[-10, 30]}
              />
              <Tooltip />
              <Legend />
              {filteredYears.map((year) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={`temp${year}`}
                  name={`${year}年`}
                  dot={false}
                  stroke={yearAndColors[year]}
                />
              ))}
            </LineChart>
          </div>
          <div style={{ width: windowSize.width * 0.05 }} className="ml-5">
            {years.map(year => (
              <div key={year} style={{ marginBottom: '10px' }}>
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
      <button
        onClick={() => navigate('/farmer_app_test')}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        BACK
      </button>
    </div>
  );
};

export default Weather;
