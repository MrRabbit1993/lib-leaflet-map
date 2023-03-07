import LMap, { IMapOptions} from "../../src/index"
import { CRS } from "leaflet"
import 'leaflet/dist/leaflet.css' // leaflet样式

const mapContainer = document.querySelector("#map")

const MapOptions: IMapOptions = { MapType: "TMap" as const, crs: CRS.EPSG4326, Token:"93724b915d1898d946ca7dc7b765dda5" }

new LMap(mapContainer as HTMLDivElement, MapOptions)
