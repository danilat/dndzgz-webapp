<template>
  <div>
    <q-toolbar color="primary">
      <q-btn flat id="back" >
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        Bizi
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script>
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
    QIcon
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
