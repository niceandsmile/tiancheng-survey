/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace AMap {
  class Map {
    constructor(container: string | HTMLElement, opts?: MapOptions);
    addControl(control: any): void;
    add(overlay: any): void;
    destroy(): void;
    setCenter(center: [number, number]): void;
    setZoom(zoom: number): void;
    setFitView(overlays?: any[]): void;
  }

  interface MapOptions {
    viewMode?: "2D" | "3D";
    zoom?: number;
    center?: [number, number];
    pitch?: number;
    mapStyle?: string;
    buildingAnimation?: boolean;
    resizeEnable?: boolean;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setTitle(title: string): void;
    on(event: string, handler: () => void): void;
  }

  interface MarkerOptions {
    position?: [number, number];
    title?: string;
    icon?: string;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map: Map, position: [number, number]): void;
    close(): void;
  }

  interface InfoWindowOptions {
    content?: string | HTMLElement;
    offset?: [number, number];
  }

  class Scale {
    constructor();
  }

  class ToolBar {
    constructor(opts?: { position?: string });
  }

  class Geocoder {
    constructor();
  }

  class Pixel {
    constructor(x: number, y: number);
  }

  class Size {
    constructor(width: number, height: number);
  }
}

interface Window {
  _AMapSecurityConfig?: {
    securityJsCode: string;
  };
}

declare module "@amap/amap-jsapi-loader" {
  export function load(options: {
    key: string;
    version: string;
    plugins?: string[];
  }): Promise<typeof AMap>;
}
