import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import WeatherDataChart from './WeatherDataChart';

const WeatherPage = () => {
  const yearAndColors = useMemo(
    () => ({
      2020: '#fc9cb8',
      2021: '#4682b4',
      2022: '#ccca45',
      2023: '#8884d8',
      2024: '#82ca9d',
      2025: '#ff7300',
    }),
    []
  );
  const years = useMemo(
    () => Object.keys(yearAndColors).map(Number),
    [yearAndColors]
  );
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleYears, setVisibleYears] = useState(
    years.reduce((acc, year) => {
      acc[year] = year === 2024 || year === 2025; // デフォルトで2024と2025のみ表示
      return acc;
    }, {})
  );

  const [filteredData, setFilteredData] = useState([]); // フィルタ済みデータ
  const [selectedRange, setSelectedRange] = useState('01-12'); // デフォルトで1~12月を選択

  // APIからデータを取得する関数
  const fetchWeatherData = async (year) => {
    const url = `https://script.google.com/macros/s/AKfycbwDIkUlnKy0XuSiMPDEEzMJ8i2SN-Zp8CuRF8Hz6KP2ftFIRNDHUcjgoX7Foo4xMCE04Q/exec?year=${year}`;
    const response = await axios.get(url);
    return response.data
      .filter((entry) => entry['年月日'].slice(5) !== '02-29') // 他の年のデータとの整合性を取るために2024/02/29を除外
      .map((entry) => ({
        date: entry['年月日'].slice(5), // "YYYY-MM-DD" の "MM-DD" 部分を抽出
        avgTemp: parseFloat(entry['平均気温(℃)']),
        maxTemp: parseFloat(entry['最高気温(℃)']),
        minTemp: parseFloat(entry['最低気温(℃)']),
        avgHumidity: parseFloat(entry['平均湿度(%)']),
        precipitation: parseFloat(entry['降水量の合計(mm)']),
        maxPrecipitation: parseFloat(entry['10分間降水量の最大(mm)']),
        avgWindSpeed: parseFloat(entry['平均風速(m/s)']),
        maxWindSpeed: parseFloat(entry['最大風速(m/s)']),
        maxGustSpeed: parseFloat(entry['最大瞬間風速(m/s)']),
        avgVaporPressure: parseFloat(entry['平均蒸気圧(hPa)']),
        sunshineHours: parseFloat(entry['日照時間(時間)']),
        totalSnowfall: parseFloat(entry['降雪量合計(cm)']),
        maxSnowDepth: parseFloat(entry['最深積雪(cm)']),
      }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await Promise.all(
          years.map((year) => fetchWeatherData(year))
        );
        const newData = years.reduce((acc, year, index) => {
          acc[year] = results[index];
          return acc;
        }, {});
        setData(newData);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [years]);

  // 各月の1日を生成（MM-DD形式）
  const getMonthlyTicks = () => {
    return [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ].map((month) => `${month}-01`);
  };

  const ticks = getMonthlyTicks();

  const combinedData = useMemo(() => {
    return (
      data[years[0]]?.map((d, i) => {
        const entry = { date: d.date };
        years.forEach((year) => {
          entry[`avgTemp${year}`] = data[year]?.[i]?.avgTemp;
          entry[`maxTemp${year}`] = data[year]?.[i]?.maxTemp;
          entry[`minTemp${year}`] = data[year]?.[i]?.minTemp;
          entry[`avgHumidity${year}`] = data[year]?.[i]?.avgHumidity;
          entry[`precipitation${year}`] = data[year]?.[i]?.precipitation;
          entry[`maxPrecipitation${year}`] = data[year]?.[i]?.maxPrecipitation;
          entry[`avgWindSpeed${year}`] = data[year]?.[i]?.avgWindSpeed;
          entry[`maxWindSpeed${year}`] = data[year]?.[i]?.maxWindSpeed;
          entry[`maxGustSpeed${year}`] = data[year]?.[i]?.maxGustSpeed;
          entry[`avgVaporPressure${year}`] = data[year]?.[i]?.avgVaporPressure;
          entry[`sunshineHours${year}`] = data[year]?.[i]?.sunshineHours;
          entry[`totalSnowfall${year}`] = data[year]?.[i]?.totalSnowfall;
          entry[`maxSnowDepth${year}`] = data[year]?.[i]?.maxSnowDepth;
        });
        return entry;
      }) || []
    );
  }, [data, years]);

  useEffect(() => {
    setFilteredData(combinedData);
  }, [combinedData]);

  const filterDataByMonthRange = (startMonth, endMonth) => {
    setSelectedRange(`${startMonth}-${endMonth}`);
    const filtered = combinedData.filter((entry) => {
      const month = entry.date.slice(0, 2);
      return month >= startMonth && month <= endMonth;
    });
    setFilteredData(filtered);
  };

  const handleYearToggle = (year) => {
    setVisibleYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const filteredYears = years.filter((year) => visibleYears[year]);

  return (
    <div className="chart-container">
      {[
        {
          title: '合計降水量',
          dataKeyPrefix: 'precipitation',
          yAxisDomain: [0, 140],
          unit: 'mm',
        },
        {
          title: '10分間の最大降水量',
          dataKeyPrefix: 'maxPrecipitation',
          yAxisDomain: [0, 25],
          unit: 'mm',
        },
        {
          title: '平均気温',
          dataKeyPrefix: 'avgTemp',
          yAxisDomain: [-10, 40],
          unit: '℃',
        },
        {
          title: '最高気温',
          dataKeyPrefix: 'maxTemp',
          yAxisDomain: [-10, 40],
          unit: '℃',
        },
        {
          title: '最低気温',
          dataKeyPrefix: 'minTemp',
          yAxisDomain: [-10, 40],
          unit: '℃',
        },
        {
          title: '平均湿度',
          dataKeyPrefix: 'avgHumidity',
          yAxisDomain: [0, 100],
          unit: '%',
        },
        {
          title: '平均蒸気圧',
          dataKeyPrefix: 'avgVaporPressure',
          yAxisDomain: [0, 35],
          unit: 'hPa',
        },
        {
          title: '平均風速',
          dataKeyPrefix: 'avgWindSpeed',
          yAxisDomain: [0, 5],
          unit: 'm/s',
        },
        {
          title: '最大風速',
          dataKeyPrefix: 'maxWindSpeed',
          yAxisDomain: [0, 12],
          unit: 'm/s',
        },
        {
          title: '最大瞬間風速',
          dataKeyPrefix: 'maxGustSpeed',
          yAxisDomain: [0, 25],
          unit: 'm/s',
        },
        {
          title: '日照時間',
          dataKeyPrefix: 'sunshineHours',
          yAxisDomain: [0, 15],
          unit: '時間',
        },
        {
          title: '降雪量合計',
          dataKeyPrefix: 'totalSnowfall',
          yAxisDomain: [0, 50],
          unit: 'cm',
        },
        {
          title: '最深積雪',
          dataKeyPrefix: 'maxSnowDepth',
          yAxisDomain: [0, 80],
          unit: 'cm',
        },
      ].map((chart, index) => (
        <WeatherDataChart
          key={index}
          title={chart.title}
          dataKeyPrefix={chart.dataKeyPrefix}
          combinedData={filteredData} // フィルタ済みのデータを渡す
          ticks={ticks}
          filteredYears={filteredYears}
          yearAndColors={yearAndColors}
          years={years}
          visibleYears={visibleYears}
          handleYearToggle={handleYearToggle}
          selectedRange={selectedRange}
          filterDataByMonthRange={filterDataByMonthRange}
          unit={chart.unit}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default WeatherPage;
