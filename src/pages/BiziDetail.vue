<template>
  <q-page class="column">
    <q-pull-to-refresh @refresh="refresher">
      <q-toolbar class="bg-primary text-white">
        <q-btn flat round dense icon="arrow_back" @click="router.back()" />
        <q-toolbar-title v-if="station">
          Parada {{ station.id }} | {{ station.title }}
        </q-toolbar-title>
        <q-btn flat round dense icon="star" @click="favoriteOpen = true" />
      </q-toolbar>

      <FavoriteMarker
        v-model:opened="favoriteOpen"
        :point="station"
        type="bizi"
        @close="favoriteOpen = false"
      />

      <q-list separator>
        <q-item-label header>Nº de bicis y aparcamientos</q-item-label>

        <q-item v-if="bikes !== null">
          <q-item-section>
            <q-item-label>{{ bikes }} bicis</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="motorcycle" />
          </q-item-section>
        </q-item>

        <q-item v-if="parkings !== null">
          <q-item-section>
            <q-item-label>{{ parkings }} aparcamientos</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="motorcycle" />
          </q-item-section>
        </q-item>
        
        <div v-if="bikes === null && parkings === null" class="flex flex-center q-pa-lg">
           <q-spinner color="primary" size="2em" />
        </div>
      </q-list>
    </q-pull-to-refresh>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { retrieveBiziStationEstimation, retrieveAllBiziStations } from '../services/data'

import FavoriteMarker from '../components/FavoriteMarker.vue'

const route = useRoute()
const router = useRouter()
const stationId = route.params.stationId

const bikes = ref(null)
const parkings = ref(null)
const station = ref(null)
const favoriteOpen = ref(false)

const updateEstimations = async () => {
  bikes.value = null
  parkings.value = null
  try {
    const estimations = await retrieveBiziStationEstimation(stationId)
    bikes.value = estimations.bikes
    parkings.value = estimations.parkings
  } catch (err) {
    console.error('Error updating estimations', err)
  }
}

const refresher = async (done) => {
  await updateEstimations()
  done()
}


onMounted(async () => {
  updateEstimations()
  const allStations = await retrieveAllBiziStations()
  station.value = allStations.find(s => s.id === stationId)
})
</script>
