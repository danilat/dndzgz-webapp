<template>
  <div class="layout-padding">
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
        :draggable="true"
        @click="center=m"
        icon="http://www.dndzgz.com/cache/markers/marker-bus.png"
      ></gmap-marker>

      <!--gmap-polyline :path="markers">
      </gmap-polyline-->
    </gmap-map>
  </div>
</template>

<script>
import { backendApiClient } from '@/core/backend-api-client'
import { retrieveAllBusStops } from '@/core/commands'

export default {
  data () {
    return {
      center: {lat: 41.641184, lng: -0.894032},
      markers: null
    }
  },
  async created () {
    this.markers = await retrieveAllBusStops(backendApiClient)
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
