import LMap, { IMapOptions } from "../../src/index"
import L from "leaflet"
import 'leaflet/dist/leaflet.css' // leaflet样式

const mapContainer = document.querySelector("#map")

const MapOptions: IMapOptions = { MapType: "Custom" as const }

class CustomMap extends LMap {
  constructor(element: HTMLDivElement, options: IMapOptions) {
    super(element, options)
  }

  /**
   * @desc 加载自定义地图，需要重写基类loadCustomMapTileLayers方法。加载leaflet演示地图
   */
  loadCustomMapTileLayers() {
    const layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    layer.addTo(this.map)
  }
}

const mapInstance = new CustomMap(mapContainer as HTMLDivElement, MapOptions)

console.log(mapInstance);
