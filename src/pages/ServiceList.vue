<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-toolbar color="primary">
      <q-toolbar-title>
        DNDzgz
      </q-toolbar-title>
    </q-toolbar>

    <q-list highlight>
      <q-item @click="goToBusMap()" id="busOption">
        <q-item-side avatar="http://www.dndzgz.com/cache/markers/marker-bus.png"/>
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
  created () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
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
