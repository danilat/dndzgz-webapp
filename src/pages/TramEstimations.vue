<template>
  <q-pull-to-refresh :handler="refresher" pull-message="Tira para actualizar" release-message="Suelta para actualizar" refresh-message="Actualizando...">
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title v-if="stop">
        Parada {{stop.id}} | {{stop.title}}
      </q-toolbar-title>
      <q-btn flat @click="markAsFavorite()">
        <q-icon name="star"/>
        <favorite-marker :opened="favoriteOpen" :close="closeFavorite" :point="stop" type="tram"/>
      </q-btn>
    </q-toolbar>
    <q-list highlight>
      <q-list-header>Próximos tranvías</q-list-header>

      <q-item v-if="error">
        <q-item-main>
          <q-item-tile label>{{error}}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="error" />
        </q-item-side>
      </q-item>

      <q-item v-if="estimations" v-for="(estimation, index) in estimations.estimates" :key="index">
        <q-item-main>
          <q-item-tile label class="estimation">{{estimation.line}} {{estimation.direction}}
            {{estimation.estimate}} minutos</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="access_time" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
  </q-pull-to-refresh>
</template>

<script>
import { retrieveTramStopEstimation, retrieveAllTramStops } from '../core/commands'
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
    return {estimations: [], error: null, favoriteOpen: false, stop: {}}
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.tramStop = this.dndzgzRouter.getParam('tramId')
    const allStops = await retrieveAllTramStops()
    this.stop = allStops.find(stop => stop.id === this.tramStop)
  },
  async created () {
    await this.updateEstimations()
  },
  methods: {
    goBack () {
      this.dndzgzRouter.goBack()
    },
    async refresher (done) {
      await this.updateEstimations()
      done()
    },
    async updateEstimations () {
      this.estimations = []
      try {
        this.estimations = await retrieveTramStopEstimation(this.tramStop)
      }
      catch (error) {
        this.error = error.message
      }
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
