<template>
  <q-toolbar color="primary">
    <q-btn flat id="back" @click="goBack()">
      <q-icon name="arrow_back" />
    </q-btn>
    <q-toolbar-title id="header_title">
      {{title}}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>

import {DndZgzRouter} from '../core/router'

import {
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon
} from 'quasar'

export default {
  name: 'MapHeader',
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon
  },
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  beforeCreate () {
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
