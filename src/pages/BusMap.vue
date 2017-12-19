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

    <map-with-markers
      icon="statics/marker-bus.png"
      :markers="markers"
      :infoWindowContentFormatter="infoWindowContentFormatter"
      :infoWindowAction="goToDetail">
    </map-with-markers>

    <!--gmap-marker
        v-show="currentPosition"
        :position="currentPosition"
        :clickable="true"
        @click="center=currentPosition"
        icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      ></gmap-marker-->
    <!--gmap-polyline :path="markers">
    </gmap-polyline-->
  </div>
</template>

<script>
import { retrieveAllBusStops } from '../core/commands'
import { userCurrentPosition } from '../core/geolocation'
import {DndZgzRouter} from '../core/router'

import MapWithMarkers from '../components/MapWithMarkers'

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
    QIcon,
    MapWithMarkers
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
    infoWindowContentFormatter (selected) {
      return `${selected.title} (${selected.lines.join(', ')})`
    },
    goToDetail (marker) {
      this.dndzgzRouter.navigateToBusDetail(marker.id)
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
