import L, { MapOptions, Map, LatLngExpression, FeatureGroup } from "leaflet"
import {  IFeatureLayer } from "./../types"


export default class BaseMap {

  readonly map: Map

  featureCollectors: IFeatureLayer = {} // 图层layer收集器

  constructor(element: HTMLDivElement, options: MapOptions) {

    this.map = L.map(element, options )

    this.loadTileLayers()

  }

  /**
   * @desc 加载地图 默认加载高德地图，有需要可以重写
   */
  loadTileLayers() {
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