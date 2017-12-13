<template>
  <div class="layout-padding">
    currentPosition: {{ currentPosition }}
    <gmap-map
    :center="center"
    :zoom="16"
    :options="{disableDefaultUI:true, zoomControl: true}"
  >
      <gmap-marker
        :key="marker.id"
        v-for="(marker, index) in markers"
        :position="marker"
        :clickable="true"
        :title="marker.title"
        @click="showMarkerInfo(index)"
        icon="http://www.dndzgz.com/cache/markers/marker-bus.png"
      ></gmap-marker>

      <gmap-info-window :position="infoWindow.position" :opened="infoWindow.opened" @closeclick="closeInfoWindow()" :options="infoWindow.options">
        {{infoWindow.content}}
      </gmap-info-window>

      <gmap-marker
        v-show="currentPosition"
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
import { retrieveAllBusStops } from '../core/commands'
import { userCurrentPosition } from '../core/geolocation'

export default {
  data () {
    return {
      center: {lat: 41.641184, lng: -0.894032},
      currentPosition: null,
      markers: null,
      infoWindow: {
        opened: true,
        options: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    }
  },
  async created () {
    this.markers = await retrieveAllBusStops()
    this.center = this.currentPosition = await userCurrentPosition()
  },
  methods: {
    showMarkerInfo (index) {
      const selected = this.markers[index]
      this.infoWindow.position = this.center = selected
      this.infoWindow.opened = true
      this.infoWindow.content = selected.title
    },
    closeInfoWindow () {
      this.infoWindow.opened = false
    }
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
