import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

    // 田んぼの座標リスト（複数の田んぼを管理）
    // 座標は 左下 から時計回りで定義していく
    const riceFields = [
      {
        name: '田んぼA',
        coords: [
          [35.08952599537605, 133.0408341550968],
          [35.08966206855041, 133.04078584958108],
          [35.089793752051364, 133.04120986466336],
          [35.089670847457086, 133.04129574113574],
        ],
      },
      {
        name: '田んぼB',
        coords: [
          [35.08967962636282, 133.0414138212852],
          [35.089846425392196, 133.0412903738562],
          [35.09002200294933, 133.04144602496234],
          [35.0901229598735, 133.0416177779071],
          [35.09010979158612, 133.04183246908795],
          [35.08986398316492, 133.0419451819579],
        ],
      },
      {
        name: '田んぼC',
        coords: [
          [35.089907877580195, 133.0420310584303],
          [35.09015807529609, 133.04192908011936],
          [35.090368767514136, 133.04253021542587],
          [35.09028097915609, 133.04268049925247],
          [35.08992982477898, 133.04220817865453],
        ],
      },
      {
        name: '田んぼD',
        coords: [
          [35.08919678514418, 133.04009883780228],
          [35.089267016771814, 133.04003443044797],
          [35.0895172164538, 133.04027059074696],
          [35.0894908796813, 133.04032426354217],
          [35.08938114303774, 133.04038330361695],
        ],
      },
    ];

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
