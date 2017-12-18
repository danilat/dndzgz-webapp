<template>
  <div>
    <q-toolbar color="primary">
      <q-toolbar-title>
        DNDzgz
      </q-toolbar-title>
    </q-toolbar>

    <q-list highlight>
      <q-item @click="goToBusMap()" id="busOption">
        <q-item-side avatar="statics/marker-bus.png"/>
        <q-item-main>
          <q-item-tile label>Autobuses</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="arrow_forward" color="faded" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import {
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QItemTile
} from 'quasar'

import {DndZgzRouter} from '../core/router'
import { userCurrentPosition } from '../core/geolocation'

export default {
  components: {
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile
  },
  data () {
    return {}
  },
  async created () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.currentPosition = await userCurrentPosition()
  },
  methods: {
    goToBusMap () {
      this.dndzgzRouter.navigateToMap()
    }
  }
}
</script>

<style>
</style>
