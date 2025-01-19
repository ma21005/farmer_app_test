import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from 'react-router-dom';
import TemperatureChart from "./TemperatureChart";

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
      maxTemp: parseFloat(entry["最高気温(℃)"]),
      minTemp: parseFloat(entry["最低気温(℃)"])
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
      entry[`avgTemp${year}`] = data[year]?.[i]?.avgTemp;
      entry[`maxTemp${year}`] = data[year]?.[i]?.maxTemp;
      entry[`minTemp${year}`] = data[year]?.[i]?.minTemp;
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
      {[
        { title: '平均気温', dataKeyPrefix: 'avgTemp', yAxisDomain: [-10, 40] },
        { title: '最高気温', dataKeyPrefix: 'maxTemp', yAxisDomain: [-10, 40] },
        { title: '最低気温', dataKeyPrefix: 'minTemp', yAxisDomain: [-10, 40] }
      ].map((chart, index) => (
        <TemperatureChart
          key={index}
          title={chart.title}
          dataKeyPrefix={chart.dataKeyPrefix}
          combinedData={combinedData}
          windowSize={windowSize}
          ticks={ticks}
          filteredYears={filteredYears}
          yearAndColors={yearAndColors}
          years={years}
          visibleYears={visibleYears}
          handleYearToggle={handleYearToggle}
          yAxisDomain={chart.yAxisDomain}
        />
      ))}
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
