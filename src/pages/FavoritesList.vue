<template>
  <div>
    <map-header title="Favoritos"/>

    <q-list highlight>
      <q-item @click="goToFavoriteDetail(favorite)" v-for="favorite in favorites" :key="favorite.id">
        <q-item-side :avatar="'statics/marker-'+favorite.type+'.png'"/>
        <q-item-main>
          <q-item-tile label>{{favorite.name}}</q-item-tile>
          {{favorite.title}}
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
import { favoritesRepository } from '../core/favorites-repository'
import {DndZgzRouter} from '../core/router'

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
    this.dndzgzRouter = new DndZgzRouter(this.$router)
    this.favorites = await retrieveAllFavorites(favoritesRepository)
  },
  methods: {
    goToFavoriteDetail (favorite) {
      if (favorite.type === 'bus') {
        this.dndzgzRouter.navigateToBusDetail(favorite.id)
      }
      else if (favorite.type === 'bizi') {
        this.dndzgzRouter.navigateToBiziDetail(favorite.id)
      }
      else {
        this.dndzgzRouter.navigateToTramDetail(favorite.id)
      }
    }
  }
}
</script>

<style>
</style>
