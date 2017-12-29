<template>
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Poste {{busStop}}
      </q-toolbar-title>
      <q-btn flat id="update" @click="updateEstimations()">
        <q-icon name="cached" />
      </q-btn>
    </q-toolbar>
    <q-list highlight>
      <q-list-header>Próximos autobuses</q-list-header>

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
</template>

<script>
import { retrieveTramStopEstimation } from '../core/commands'
import { DndZgzRouter } from '../core/router'

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
  QItemTile
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
    QItemTile
  },
  data () {
    return {estimations: [], error: null}
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.tramStop = this.dndzgzRouter.getParam('tramId')
    this.estimations = await retrieveTramStopEstimation(this.tramStop)
  },
  methods: {
    goBack () {
      this.dndzgzRouter.navigateToTramMap()
    }
  }
}
</script>

<style>
</style>
