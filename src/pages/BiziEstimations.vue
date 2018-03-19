<template>
  <q-pull-to-refresh :handler="refresher" pull-message="Tira para actualizar" release-message="Suelta para actualizar" refresh-message="Actualizando...">

  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title v-if="station">
        Parada {{station.id}} | {{station.title}}
      </q-toolbar-title>

      <q-btn flat @click="markAsFavorite()">
        <q-icon name="star"/>
        <favorite-marker :opened="favoriteOpen" :close="closeFavorite" :point="station" type="bizi"/>
      </q-btn>
    </q-toolbar>

    <q-list highlight>
      <q-list-header>Nº de bicis y aparcamientos</q-list-header>

      <q-item v-if="bikes">
        <q-item-main class="estimated_bikes">
          <q-item-tile label>{{bikes}} bicis</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="motorcycle" />
        </q-item-side>
      </q-item>

      <q-item v-if="parkings">
        <q-item-main  class="estimated_parkings">
          <q-item-tile label>{{parkings}} aparcamientos</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="motorcycle" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
  </q-pull-to-refresh>
</template>

<script>
import { retrieveBiziStationEstimation, retrieveAllBiziStations } from '../core/commands'
import { DndZgzRouter } from '../core/router'
import FavoriteMarker from '../components/FavoriteMarker'

import {
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QItemTile,
  QPullToRefresh
} from 'quasar'

export default {
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QPullToRefresh,
    FavoriteMarker
  },
  data () {
    return {bikes: null, parkings: null, favoriteOpen: false, station: {}}
  },
  beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.stationId = this.dndzgzRouter.getParam('stationId')
  },
  async created () {
    this.updateEstimations()
    const allStastions = await retrieveAllBiziStations()
    this.station = allStastions.find(station => station.id === this.stationId)
  },
  methods: {
    goBack () {
      this.dndzgzRouter.navigateToBiziMap()
    },
    async refresher (done) {
      await this.updateEstimations()
      done()
    },
    async updateEstimations () {
      this.bikes = null
      this.parkings = null
      const estimations = await retrieveBiziStationEstimation(this.stationId)
      this.bikes = estimations.bikes
      this.parkings = estimations.parkings
    },
    markAsFavorite () {
      this.favoriteOpen = true
    },
    closeFavorite () {
      this.favoriteOpen = false
    }
  }
}
</script>

<style>
</style>
