<template>
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Taxis
      </q-toolbar-title>
    </q-toolbar>

    <map-with-markers
      icon="statics/marker-taxis.png"
      :markers="stops"
      :infoWindowContentFormatter="infoWindowContentFormatter">
    </map-with-markers>
  </div>
</template>

<script>
import { DndZgzRouter } from '../core/router'
import { retrieveAllTaxiStops } from '../../src/core/commands'

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
    return {stops: []}
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.stops = await retrieveAllTaxiStops()
  },
  methods: {
    goBack () {
      this.dndzgzRouter.navigateToServiceList()
    },
    infoWindowContentFormatter (selected) {
      return selected.title
    }
  }
}
</script>

<style>
</style>
