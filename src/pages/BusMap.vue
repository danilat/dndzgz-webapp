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
      :markers="stops"
      :infoWindowContentFormatter="infoWindowContentFormatter"
      :infoWindowAction="goToDetail">
    </map-with-markers>
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
      stops: []
    }
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.center = this.currentPosition = await userCurrentPosition()
  },
  async created () {
    this.stops = await retrieveAllBusStops()
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
