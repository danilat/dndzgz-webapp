<template>
  <map-header title="Tranvía"/>
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
  }
}
</script>

<style>
</style>
