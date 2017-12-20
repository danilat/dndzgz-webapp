<template>
  <div>
    <map-header title="Bus"/>

    <map-with-markers
      icon="statics/marker-bus.png"
      :markers="stops"
      :infoWindowContentFormatter="infoWindowContentFormatter"
      :infoWindowAction="goToDetail">
    </map-with-markers>
  </div>
</template>

<script>
import { retrieveAllBusStops } from '../core/commands'
import { userCurrentPosition } from '../core/geolocation'
import {DndZgzRouter} from '../core/router'

import MapWithMarkers from '../components/MapWithMarkers'
import MapHeader from '../components/MapHeader'

export default {
  components: {
    MapHeader,
    MapWithMarkers
  },
  data () {
    return {
      stops: []
    }
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.center = this.currentPosition = await userCurrentPosition()
  },
  async created () {
    this.stops = await retrieveAllBusStops()
  },
  methods: {
    infoWindowContentFormatter (selected) {
      return `${selected.title} (${selected.lines.join(', ')})`
    },
    goToDetail (marker) {
      this.dndzgzRouter.navigateToBusDetail(marker.id)
    }
  }
}
</script>
