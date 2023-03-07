import LMap from "../../src/index"
import 'leaflet/dist/leaflet.css' // leaflet样式
const mapContainer = document.querySelector("#map")
const mapInstance = new LMap(mapContainer as HTMLDivElement)
console.log(mapInstance);

