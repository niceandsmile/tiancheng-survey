import { useMemo } from "react";
import { COMPANY_COORDS, COMPANY_INFO, MAP_ZOOM } from "../../utils/constants";

interface Props {
  height?: string;
  className?: string;
}

/**
 * 地图区块 — 使用 Leaflet + OSM 瓦片，完全免费，无需 API Key
 * 通过 iframe srcDoc 嵌入，零外部依赖
 */
export default function AmapBlock({ height, className = "" }: Props) {
  const [lng, lat] = COMPANY_COORDS;
  const { name, address, phone } = COMPANY_INFO;

  // 生成一张完整的地图 HTML 页面，内嵌到 iframe
  const mapHtml = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0A1628}
#map{width:100vw;height:100vh}
/* Leaflet 暗色主题适配 */
.leaflet-control-zoom a{background:#132744 !important;color:#94A3B8 !important;border-color:#1E3A5F !important}
.leaflet-control-attribution{background:rgba(10,22,40,0.85) !important;color:#64748B !important;font-size:10px !important}
.leaflet-control-attribution a{color:#00D4FF !important}
.leaflet-popup-content-wrapper{background:#132744 !important;color:#E2E8F0 !important;border-radius:12px !important;box-shadow:0 4px 24px rgba(0,0,0,0.4) !important}
.leaflet-popup-tip{background:#132744 !important}
.leaflet-popup-content{padding:10px 16px !important;font-size:14px !important;line-height:1.6 !important;min-width:200px !important}
.leaflet-popup-content strong{color:#fff;font-size:15px}
.leaflet-popup-content .addr{font-size:12px;color:#94A3B8;margin-top:2px}
.leaflet-popup-content .nav-btn{display:inline-block;margin-top:8px;padding:6px 16px;background:#1677ff;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500}
</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<script>
var map=L.map('map',{zoomControl:true,attributionControl:true}).setView([${lat},${lng}],${MAP_ZOOM});
// 高德公开瓦片 — 国内 CDN，免费免 Key
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',{subdomains:'1234',maxZoom:18,attribution:'&copy; 高德地图'}).addTo(map);
var marker=L.marker([${lat},${lng}]).addTo(map);
var popupContent='<strong>${name}</strong><br/><span class="addr">${address}</span><br/><span class="addr">📞 ${phone}</span><br/><a class="nav-btn" href="https://uri.amap.com/navigation?to=${lng},${lat},${encodeURIComponent(name)}&mode=car&callnative=1" target="_blank">🧭 导航去这里</a>';
marker.bindPopup(popupContent).openPopup();
<\/script>
</body>
</html>`;
  }, [lng, lat]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-navy-700 ${className}`}
      style={height ? { height } : undefined}
    >
      <iframe
        srcDoc={mapHtml}
        title={`${name} — 地图`}
        className="w-full h-full"
        style={{ border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        loading="lazy"
      />
    </div>
  );
}
