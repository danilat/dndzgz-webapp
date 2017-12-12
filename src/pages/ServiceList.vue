<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-list highlight>
      <q-item>
        <q-item-side avatar="http://www.dndzgz.com/cache/markers/marker-bus.png"/>
        <q-item-main>
          <q-item-tile label @click="goToBusMap()">Autobuses</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="arrow_forward" color="faded" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import {QList, QListHeader, QItem, QItemSide, QItemMain, QItemTile} from 'quasar'

export default {
  components: {
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
  methods: {
    goToBusMap () {
      this.$router.push('/map')
    }
  }
}
</script>

<style>
</style>
