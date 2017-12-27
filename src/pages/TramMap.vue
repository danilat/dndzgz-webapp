<template>
  <div>
    <map-header title="Tranvía"/>

    <map-with-markers
      icon="statics/marker-tram.png"
      :markers="stops"
      :infoWindowContentFormatter="infoWindowContentFormatter"
      :infoWindowAction="goToDetail">
    </map-with-markers>
  </div>
</template>

<script>
import {retrieveAllTramStops} from '../../src/core/commands'
import {DndZgzRouter} from '../core/router'

import MapWithMarkers from '../components/MapWithMarkers'
import MapHeader from '../components/MapHeader'

export default {
  components: {
    MapWithMarkers,
    MapHeader
  },
  data () {
    return {stops: []}
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.stops = await retrieveAllTramStops()
  },
  methods: {
    infoWindowContentFormatter (selected) {
      return selected.title
    },
    goToDetail (marker) {
      this.dndzgzRouter.navigateToTramDetail(marker.id)
    }
  }
}
</script>

<style>
</style>
