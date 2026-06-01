import { useEffect, useRef, useState, useMemo } from "react";

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY || "";
const COMPANY_NAME = "深圳市天成测绘技术有限公司";
const COMPANY_ADDRESS = "深圳市龙岗区龙城街道盛平社区龙城大道177号荔园大楼4F";

if (!(window as any)._AMapSecurityConfig) {
  (window as any)._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_AMAP_SECURITY_CODE || "",
  };
}

interface Props { height?: string; className?: string; }

export default function AmapBlock({ height, className = "" }: Props) {
  // Unique container ID per mount — prevents SPA re-attach conflict
  const uid = useMemo(() => "amap-" + Math.random().toString(36).slice(2, 10), []);
  const [status, setStatus] = useState<"loading" | "done" | "fail">("loading");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let dead = false;
    let map: any = null;
    let n = 0;

    const init = () => {
      if (dead) return;
      const el = document.getElementById(uid);
      if (!el) { n++; if (n < 10) setTimeout(init, 100); else { setErrMsg("容器未找到"); setStatus("fail"); } return; }
      try {
        const A = (window as any).AMap;
        map = new A.Map(uid, { zoom: 17, center: [114.251376, 22.732775], resizeEnable: true });
        map.addControl(new A.Scale());

        const pos: [number, number] = [114.251376, 22.732775];
        const navUrl = `https://uri.amap.com/navigation?to=${pos[0]},${pos[1]},${encodeURIComponent(COMPANY_NAME)}&mode=car&callnative=1`;
        const html = `<div style="padding:10px 16px;font-size:14px;color:#0f172a;line-height:1.6;min-width:200px"><strong>${COMPANY_NAME}</strong><br/><span style="font-size:12px;color:#64748b">${COMPANY_ADDRESS}</span><br/><a href="${navUrl}" target="_blank" style="display:inline-block;margin-top:8px;padding:5px 16px;background:#1677ff;color:#fff;border-radius:6px;text-decoration:none;font-size:13px">🧭 导航去这里</a></div>`;

        const mk = new A.Marker({ position: pos, title: COMPANY_NAME });
        mk.setMap(map);
        new A.InfoWindow({ content: html, offset: [0, -35] }).open(map, pos);
        mk.on("click", () => new A.InfoWindow({ content: html, offset: [0, -35] }).open(map, pos));

        const btn = document.createElement("div");
        btn.innerHTML = `<div style="display:flex;align-items:center;gap:4px;padding:8px 14px;background:#1677ff;color:#fff;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.15);white-space:nowrap;font-family:system-ui,sans-serif">🧭 导航去这里</div>`;
        btn.style.cssText = "position:absolute;bottom:20px;right:20px;z-index:100";
        btn.onclick = () => window.open(navUrl, "_blank");
        el.appendChild(btn);

        setStatus("done");
      } catch (e: any) {
        setErrMsg(e.message || String(e));
        setStatus("fail");
      }
    };

    const loadSdk = () => {
      if ((window as any).AMap?.Map) { init(); return; }
      if (document.querySelector("script[data-amap]")) {
        let tries = 0;
        const t = setInterval(() => { if ((window as any).AMap?.Map) { clearInterval(t); init(); } if (++tries > 50) { clearInterval(t); setErrMsg("SDK 加载超时"); setStatus("fail"); } }, 200);
        return () => { clearInterval(t); };
      }
      const s = document.createElement("script");
      s.setAttribute("data-amap", "1");
      s.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&plugin=AMap.Scale,AMap.ToolBar`;
      s.onload = () => init();
      s.onerror = () => { if (!dead) { setErrMsg("SDK 加载失败"); setStatus("fail"); } };
      document.head.appendChild(s);
    };

    loadSdk();
    return () => { dead = true; if (map) try { map.destroy(); } catch (_) {} };
  }, [uid]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-navy-700 ${className}`}
      style={height ? { height } : undefined}
    >
      <div id={uid} className="w-full h-full" />
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy-900 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-400 text-sm">地图加载中…</span>
          </div>
        </div>
      )}
      {status === "fail" && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy-900 z-10 px-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-slate-300 text-base font-medium mb-1">地图暂不可用</p>
            <p className="text-slate-500 text-xs mb-4">{errMsg}</p>
            <div className="inline-block text-left p-4 rounded-xl bg-navy-800 border border-navy-700">
              <p className="text-white font-semibold text-sm mb-2">{COMPANY_NAME}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{COMPANY_ADDRESS}</p>
              <p className="text-cyan-400 text-xs mt-2">📞 0755-84574977</p>
            </div>
          </div>
        </div>
      )}
      <div id={uid} className="w-full h-full" />
    </div>
  );
}
