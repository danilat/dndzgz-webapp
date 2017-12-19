<template>
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Bus
      </q-toolbar-title>
    </q-toolbar>

    <gmap-map
    :center="center"
    :zoom="16"
    :options="{disableDefaultUI:true, zoomControl: true}"
  >
      <gmap-marker
        :key="marker.id"
        :id="'marker'+marker.id"
        v-for="(marker, index) in markers"
        :position="marker"
        :clickable="true"
        :title="marker.title"
        @click="showMarkerInfo(index)"
        icon="statics/marker-bus.png"
      ></gmap-marker>

      <gmap-info-window id="infoWindow" :position="infoWindow.marker" :opened="infoWindow.opened" @closeclick="closeInfoWindow()" :options="infoWindow.options">
        <q-btn id="goToDetailButton" @click="goToDetail(infoWindow.marker.id)">
          {{infoWindow.content}}
          <q-icon name="arrow_forward" />
        </q-btn>
      </gmap-info-window>

      <gmap-marker
        v-show="currentPosition"
        :position="currentPosition"
        :clickable="true"
        @click="center=currentPosition"
        icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      ></gmap-marker>

      <!--gmap-polyline :path="markers">
      </gmap-polyline-->
    </gmap-map>
  </div>
</template>

<script>
import { retrieveAllBusStops } from '../core/commands'
import { userCurrentPosition } from '../core/geolocation'
import {DndZgzRouter} from '../core/router'

import {
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon
} from 'quasar'

export default {
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon
  },
  data () {
    return {
      center: {lat: 41.641184, lng: -0.894032},
      currentPosition: null,
      markers: null,
      infoWindow: {
        opened: false,
        options: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    }
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.center = this.currentPosition = await userCurrentPosition()
  },
  async created () {
    this.markers = await retrieveAllBusStops()
  },
  methods: {
    showMarkerInfo (index) {
      const selected = this.markers[index]
      this.infoWindow.marker = this.center = selected
      this.infoWindow.opened = true
      this.infoWindow.content = `${selected.title} (${selected.lines.join(', ')})`
    },
    closeInfoWindow () {
      this.infoWindow.opened = false
    },
    goToDetail (id) {
      this.dndzgzRouter.navigateToBusDetail(id)
    },
    goBack () {
      this.dndzgzRouter.navigateToServiceList()
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
