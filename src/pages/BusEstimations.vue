<template>
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Poste {{busStop}}
      </q-toolbar-title>
      <q-btn flat>
        <q-icon name="cached" />
      </q-btn>
    </q-toolbar>
    <q-list highlight>
      <q-list-header>Próximos autobuses</q-list-header>

      <q-item v-for="estimation in estimations.estimates">
        <q-item-main>
          <q-item-tile label>{{estimation.line}} {{estimation.direction}}
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
import { retrieveBusStopEstimation } from '../core/commands'
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
    return {estimations: null}
  },
  async created () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.estimations = await retrieveBusStopEstimation(this.dndzgzRouter.getParam('busId'))
  },
  computed: {
    busStop () {
      return this.dndzgzRouter.getParam('busId')
    }
  },
  methods: {
    goBack () {
      this.dndzgzRouter.navigateToMap()
    }
  }
}
</script>

<style>
</style>
