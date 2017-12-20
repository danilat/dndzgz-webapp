<template>
  <div>
    <map-header title="Bizi"/>

    <map-with-markers
      icon="statics/marker-bizi.png"
      :markers="stations"
      :infoWindowContentFormatter="infoWindowContentFormatter"
      :infoWindowAction="goToDetail">
    </map-with-markers>
  </div>
</template>

<script>
import {DndZgzRouter} from '../core/router'
import { retrieveAllBiziStations } from '../core/commands'

import MapWithMarkers from '../components/MapWithMarkers'
import MapHeader from '../components/MapHeader'

export default {
  components: {
    MapHeader,
    MapWithMarkers
  },
  data () {
    return {stations: []}
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.stations = await retrieveAllBiziStations()
  },
  methods: {
    goToDetail (marker) {
      this.dndzgzRouter.navigateToBiziDetail(marker.id)
    },
    infoWindowContentFormatter (station) {
      return station.title
    }
  }
}
</script>

<style>
</style>
