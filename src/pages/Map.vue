<template>
  <div class="layout-padding">
    currentPosition: {{ currentPosition }}
    <gmap-map
    :center="center"
    :zoom="16"
    :options="{disableDefaultUI:true, zoomControl: true}"
  >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m"
        :clickable="true"
        @click="center=m"
        icon="http://www.dndzgz.com/cache/markers/marker-bus.png"
      ></gmap-marker>

      <gmap-marker
        v-if="currentPosition"
        :position="currentPosition"
        :clickable="true"
        @click="center=currentPosition"
      ></gmap-marker>

      <!--gmap-polyline :path="markers">
      </gmap-polyline-->
    </gmap-map>
  </div>
</template>

<script>
import { backendApiClient } from '@/core/backend-api-client'
import { retrieveAllBusStops } from '@/core/commands'
import { userCurrentPosition } from '@/core/geolocation'

export default {
  data () {
    return {
      center: {lat: 41.641184, lng: -0.894032},
      currentPosition: null,
      markers: null
    }
  },
  async created () {
    this.markers = await retrieveAllBusStops(backendApiClient)
    this.currentPosition = await userCurrentPosition()
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
