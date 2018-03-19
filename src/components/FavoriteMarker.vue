<template>
  <q-modal v-model="opened" content-css="padding: 20px">
    Dale un nombre a tu favorito
    <q-input v-model="name" id="favorite_name"/>
    <q-btn
      color="primary"
      @click="saveAndClose"
      label="Guardar"
      id="favorite_button"
      required="required"
    >
    Guardar
    </q-btn>
  </q-modal>
</template>

<script>

import { favoritesRepository } from '../core/favorites-repository'
import { markAsFavorite } from '../core/commands'

import {
  QModal,
  QInput,
  QBtn
} from 'quasar'

export default {
  name: 'FavoriteMarker',
  components: {
    QModal,
    QInput,
    QBtn
  },
  data () {
    return {name: ''}
  },
  props: {
    opened: {
      type: Boolean,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    point: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    closes () {
      console.log('closed')
    },
    async saveAndClose () {
      await markAsFavorite(this.name, this.point, this.type, favoritesRepository)
      this.close()
      this.name = ''
    }
  }
}
</script>

<style>
</style>
