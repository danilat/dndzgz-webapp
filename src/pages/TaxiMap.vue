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
  }
}
</script>

<style>
</style>
