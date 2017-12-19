<template>
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Bizi
      </q-toolbar-title>
    </q-toolbar>
    <map-with-markers icon="statics/marker-bizi.png" :markers="stations"></map-with-markers>
  </div>
</template>

<script>
import {DndZgzRouter} from '../core/router'
import { retrieveAllBiziStations } from '../core/commands'

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
    return {stations: []}
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.stations = await retrieveAllBiziStations()
  },
  methods: {
    goBack () {
      this.dndzgzRouter.navigateToServiceList()
    }
  }
}
</script>

<style>
</style>
