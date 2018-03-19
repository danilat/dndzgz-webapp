<template>
  <div>
    <map-header title="Favoritos"/>

    <q-list highlight>
      <q-item @click="goToFavoriteDetail()">
        <q-item-side avatar="statics/marker-bus.png"/>
        <q-item-main>
          <q-item-tile label>favorite title</q-item-tile>
          favorite address
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="arrow_forward" color="faded" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { retrieveAllFavorites } from '../core/commands'

import MapHeader from '../components/MapHeader'
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

export default {
  components: {
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    MapHeader
  },
  data () {
    return {
      favorites: []
    }
  },
  async created () {
    this.favorites = await retrieveAllFavorites()
  },
  methods: {
    goToFavoriteDetail () {

    }
  }
}
</script>

<style>
</style>
