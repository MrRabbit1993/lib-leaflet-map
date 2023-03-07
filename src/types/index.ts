import { FeatureGroup, MapOptions,CRS } from "leaflet"

export interface IFeatureLayer {

  [key: string]: FeatureGroup

}

export type IMapOptions = MapOptions & { MapType?: "AMap" | "Custom" } | MapOptions & { MapType:"TMap",Token:string,crs:typeof CRS.EPSG4326 }