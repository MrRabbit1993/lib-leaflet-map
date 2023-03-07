import LMap from "../../src/index"
import 'leaflet/dist/leaflet.css' // leaflet样式
const mapContainer = document.querySelector("#map")
new LMap(mapContainer as HTMLDivElement)
