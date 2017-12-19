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
      :icon="icon"
      @click="showMarkerInfo(index)">
    </gmap-marker>

    <gmap-info-window id="infoWindow" :position="infoWindow.marker" :opened="infoWindow.opened" @closeclick="closeInfoWindow()" :options="infoWindow.options">
      <q-btn v-if="infoWindowAction" id="goToInfoWindowAction" @click="goToInfoWindowAction(infoWindow.marker)">
        {{infoWindow.content}}
        <q-icon name="arrow_forward" />
      </q-btn>
      <div v-else>
        {{ infoWindow.content }}
      </div>
    </gmap-info-window>

    <gmap-marker
        v-show="currentPosition"
        :position="currentPosition"
        :clickable="true"
        @click="center=currentPosition"
        title="Tu posición"
        icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      ></gmap-marker>

    <gmap-polyline v-if="path" :path="path">
    </gmap-polyline>

  </gmap-map>
</template>

<script>
import { userCurrentPosition } from '../core/geolocation'

import {
  QBtn,
  QIcon
} from 'quasar'

export default {
  name: 'MapWithMarkers',
  components: {
    QBtn,
    QIcon
  },
  data () {
    return {
      center: {lat: 41.641184, lng: -0.894032},
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
  props: {
    markers: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    infoWindowContentFormatter: {
      type: Function,
      required: true
    },
    infoWindowAction: {
      type: Function
    },
    path: {
      type: Array
    }
  },
  async created () {
    this.center = this.currentPosition = await userCurrentPosition()
  },
  methods: {
    showMarkerInfo (index) {
      const selected = this.markers[index]
      this.infoWindow.marker = this.center = selected
      this.infoWindow.opened = true
      this.infoWindow.content = this.infoWindowContentFormatter(selected)
    },
    closeInfoWindow () {
      this.infoWindow.opened = false
    },
    goToInfoWindowAction (marker) {
      this.infoWindowAction(marker)
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
