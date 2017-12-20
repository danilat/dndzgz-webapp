<template>
  <map-header title="Tranvía"/>
</template>

<script>
import MapWithMarkers from '../components/MapWithMarkers'
import MapHeader from '../components/MapHeader'

export default {
  components: {
    MapWithMarkers,
    MapHeader
  },
  data () {
    return {stops: []}
  }
}
</script>

<style>
</style>
