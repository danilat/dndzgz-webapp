<template>
  <div>
    <map-header title="Tranvía"/>

    <map-with-markers
      icon="statics/marker-tram.png"
      :markers="stops"
      :infoWindowContentFormatter="infoWindowContentFormatter">
    </map-with-markers>
  </div>
</template>

<script>
import {retrieveAllTramStops} from '../../src/core/commands'

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
    this.stops = await retrieveAllTramStops()
  },
  methods: {
    infoWindowContentFormatter (selected) {
      return selected.title
    }
  }
}
</script>

<style>
</style>
