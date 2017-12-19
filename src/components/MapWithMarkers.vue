<template>
  <gmap-map
  :center="center"
  :zoom="16"
  :options="{disableDefaultUI:true, zoomControl: true}">
    <gmap-marker
      :key="marker.id"
      :id="'marker'+marker.id"
      v-for="(marker, index) in markers"
      :position="marker"
      :clickable="true"
      :title="marker.title"
      :icon="icon">
    </gmap-marker>
  </gmap-map>
</template>

<script>
import { userCurrentPosition } from '../core/geolocation'

export default {
  name: 'MapWithMarkers',
  data () {
    return {center: {lat: 41.641184, lng: -0.894032}}
  },
  props: {
    markers: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  async created () {
    this.center = this.currentPosition = await userCurrentPosition()
  }
}
</script>

<style>
.vue-map-container{
  position: relative;
}
.vue-map{
    height: 600px;
    overflow: hidden;
    width: 100%;
    padding-bottom: 22.25%;
    padding-top: 30px;
    position: relative;
}
</style>
