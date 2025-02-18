import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import riceFields from '../hooks/riceFields';

// 田んぼの表面積の計算に使用
import * as turf from '@turf/turf';

const LeafletMap = () => {
  useEffect(() => {
    // 地図を初期化（初期ズームを18にして最大ズームも18に制限）
    const map = L.map('map', {
      center: [35.09000349260616, 133.04067493917879],
      zoom: 18,
      maxZoom: 18,
    });

    // タイルレイヤーを追加（衛星写真）
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
      }
    ).addTo(map);

    // 赤色のカスタムアイコンを作成
    const customIcon = L.icon({
      iconUrl:
        'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png',
      iconSize: [25, 41], // アイコンのサイズ
      iconAnchor: [12.5, 41], // アイコンのアンカー（位置）
      popupAnchor: [0, -32], // ポップアップのアンカー（位置）
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41], // 影のサイズ
    });

    // 家の位置（赤色のカスタムアイコンを使用）
    L.marker([35.08986398316492, 133.0407160749473], { icon: customIcon })
      .addTo(map)
      .openPopup();

    // 面積を計算する関数（平方メートル）
    const calculateArea = (coords) => {
      // 面積を計算するために最初の座標を最後に追加
      const closedCoords = [...coords, coords[0]];

      const polygon = turf.polygon([closedCoords]);
      const area = turf.area(polygon);
      return area.toFixed(2); // 小数点2桁まで表示
    };

    // 各田んぼをループしてポリゴンを描画
    riceFields.forEach((field) => {
      const area = calculateArea(field.coords); // 面積を計算
      const polygon = L.polygon(field.coords, {
        color: 'orange',
        fillColor: 'orange',
        fillOpacity: 0.5,
      }).addTo(map);

      // ポリゴンにポップアップを追加
      polygon.bindPopup(`${field.name}<br>面積: ${area} m²`);
    });

    // 地図クリックイベント
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;

      // クリックした位置の緯度と経度をコンソールに出力する
      console.log(`[${lat}, ${lng}]`);
    });

    // クリーンアップ処理
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div
        id="map"
        className="mt-24 mx-auto"
        style={{ height: '80vh', width: '80%' }}
      />
    </div>
  );
};

export default LeafletMap;
