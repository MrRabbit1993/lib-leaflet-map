import { IMapOptions } from "./../types"

import BaseMap from './BaseMap'

import { defaultMapOptions } from './../config'

export default class LMap extends BaseMap {

  constructor(element: HTMLDivElement, options: IMapOptions = {}) {

    super(element, Object.assign(defaultMapOptions, options))

  }
}