import L, { MapOptions } from 'leaflet'

export const defaultCenter = [104.065735, 30.657469]

export const defaultMapOptions: MapOptions = {
  center: L.latLng(defaultCenter[1], defaultCenter[0]),
  zoom: 8,
  // crs:L.CRS.EPSG4326, // light theme Coordinate system
  minZoom: 8,
  zoomControl: false,
  attributionControl: false, // close leaflet advertising
  closePopupOnClick: false, // map clicked,clone dialog
  preferCanvas: true,
  scrollWheelZoom: true
}