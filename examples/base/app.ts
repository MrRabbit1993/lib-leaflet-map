import LMap from "./../../src/index"
import 'leaflet/dist/leaflet.css' // leaflet样式
console.log("app hello", LMap);
const mapContainer = document.querySelector("#map")
console.log(mapContainer);
const _instance = new LMap(mapContainer as HTMLDivElement)
