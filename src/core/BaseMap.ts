import L, {  Map, LatLngExpression, FeatureGroup } from "leaflet"
import { IFeatureLayer, IMapOptions } from "./../types"


export default class BaseMap {

  readonly map: Map

  private featureCollectors: IFeatureLayer = {} // 图层layer收集器

  constructor(element: HTMLDivElement, options: IMapOptions) {

    this.map = L.map(element, options )
    const { MapType } = options

    if (MapType === "AMap") {
      this.loadAMapTileLayers()
    } else if (MapType === "TMap") {
      this.loadTMapTileLayers(options.Token)
    } else {
      this.loadCustomMapTileLayers()
    }
  }

  /**
   * @desc 加载高德地图
   */
  loadAMapTileLayers() {
    const layer = L.tileLayer("https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}", {
      subdomains: "1234"
    });
    layer.addTo(this.map)
  }

  /**
   * @desc 加载天地图地图
   */
  loadTMapTileLayers(Token:string) {
    const vector_map_layer = L.tileLayer(
      `http://t2.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${Token}`,
      {
        maxZoom: 17,
        tileSize: 256,
        zoomOffset: 1,
        minZoom: 3,
      }
    );
    //添加注记
    const vector_note_layer = L.tileLayer(
      `http://t2.tianditu.com/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${Token}`,
      {
        maxZoom: 17,
        tileSize: 256,
        zoomOffset: 1,
        zIndex: 5,
        minZoom: 3,
      }
    )
    vector_map_layer.addTo(this.map);
    vector_note_layer.addTo(this.map);
  }

  /**
   * @desc 加载自定义地图，默认加载高德地图，需要可以重写
   */
  loadCustomMapTileLayers() {
    const layer = L.tileLayer("https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}", {
      subdomains: "1234"
    });
    layer.addTo(this.map)
  }

  /**
   * @desc 设置缩放层级
   * @param zoom 层级大小
   */
  setZoom(zoom: number) {
    this.map.setZoom(zoom)
  }

  /**
   * @desc 设置中心点
   * @param latLng 中心点坐标
   */
  setCenter(latLng: LatLngExpression) {
    this.map.panTo(latLng)
  }

  /**
  * @desc 设置中心点和缩放
  * @param latLng 中心点坐标
  * @param zoom 层级大小
  */
  setCenterZoom(latLng: LatLngExpression, zoom: number) {
    this.map.setView(latLng, zoom)
  }

  /**
  * @desc 转换经纬度格式
  * @param latLng 经纬度
  * @return latLngLatLngExpression
  */
  toLatLng<T extends LatLngExpression>(latLng: T) {
    if (Array.isArray(latLng)) {
      return L.latLng(latLng[1], latLng[0])
    }
    return latLng
  }

  /**
  * @desc 获取图层
  * @param { string } type 图层类型
  * @return { FeatureGroup } 返回指定类型图层的集合feature
  */
  getFeature<T>(type: string): FeatureGroup<T> {
    return this.featureCollectors[type]
  }

  /**
  * @desc 新增图层
  * @param { string } type 图层类型
  * @return { FeatureGroup } 返回指定类型图层的feature
   */
  addFeature<T>(type: string): FeatureGroup<T>{
    const feature = L.featureGroup()
    this.removeFeature(type)
    this.featureCollectors[type] = feature.addTo(this.map)
    return feature
  }


  /**
 * @desc 清除feature图层
 * @param { string } type 图层类型
 * @return { FeatureGroup } 返回指定类型图层的feature
  */
  removeFeature(type?: string) {
    if (type) {
      const currentFeature = this.featureCollectors[type]
      if (currentFeature) {
        currentFeature.remove()
        delete this.featureCollectors[type]
      }
    } else {
      Object.keys(this.featureCollectors).forEach((key) => {
        this.featureCollectors[key].remove()
        delete this.featureCollectors[key]
      })
    }
  }
}