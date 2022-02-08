import * as mapboxGl from "mapbox-gl"
import Wind from './wind/wind'

class Map {
  config: mapboxGl.MapboxOptions | undefined
  map: mapboxGl.Map | undefined
  constructor (config: mapboxGl.MapboxOptions | undefined) {
    this.config = config
    this.map = undefined
  }

  init () : mapboxGl.Map {
    this.map = new mapboxGl.Map(this.config)
    this.createWind()
    return this.map
  }

  createWind () {
    new Wind(this.map as mapboxGl.Map).init().drawWind()
  }
}
export default Map