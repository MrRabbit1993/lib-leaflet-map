import { MapOptions } from "leaflet"

import BaseMap from './BaseMap'

import { defaultMapOptions } from './../config'

export default class LMap extends BaseMap {

  constructor(element: HTMLDivElement, options: MapOptions = {}) {

    super(element, Object.assign(defaultMapOptions, options))

  }
}