<template>
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" @click="goBack()">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Taxis
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script>
import { DndZgzRouter } from '../core/router'

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
    return {}
  },
  async beforeCreate () {
    this.dndzgzRouter = new DndZgzRouter(this.$router)
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
