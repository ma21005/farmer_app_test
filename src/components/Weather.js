import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Weather = () => {
  const yearAndColors = useMemo(() => ({
    2022: '#ccca45',
    2023: '#8884d8',
    2024: '#82ca9d', 
    2025: '#ff7300'
  }), []);
  const years = useMemo(() => Object.keys(yearAndColors).map(Number), [yearAndColors]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1>2022年～2025年の平均気温比較</h1>
      <LineChart width={1600} height={400} data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          ticks={ticks}
          domain={["01-01", "12-31"]}
          allowDataOverflow={true}
        />
        <YAxis unit="℃" />
        <Tooltip />
        <Legend />
        {years.map((year, index) => (
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
  );
};

export default Weather;
