<template>
  <q-modal v-model="isOpen" content-css="padding: 20px">
    Dale un nombre a tu favorito para acordarte más adelante
    <q-input v-model="name" id="favorite_name" required="required" placeholder="Ej: para ir a clase..."/>
    <q-btn
      color="primary"
      @click="saveAndClose"
      label="Guardar"
      id="favorite_button"
    >
    Guardar
    </q-btn>
    <q-btn
      color="warning"
      @click="close"
      label="Cerrar"
    >
    Cerrar
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
      type: Boolean
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
  computed: {
    isOpen: {
      get: function () {
        return this.opened
      },
      set: function (value) {
        if (value === false) {
          this.close()
        }
      }
    }
  },
  methods: {
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
