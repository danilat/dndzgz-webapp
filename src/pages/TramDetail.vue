<template>
  <q-page class="column">
    <q-pull-to-refresh @refresh="refresher">
      <q-toolbar class="bg-primary text-white">
        <q-btn flat round dense icon="arrow_back" @click="router.back()" />
        <q-toolbar-title v-if="stop">
          Parada {{ stop.id }} | {{ stop.title }}
        </q-toolbar-title>
        <q-btn flat round dense icon="star" @click="favoriteOpen = true" />
      </q-toolbar>

      <FavoriteMarker
        v-model:opened="favoriteOpen"
        :point="stop"
        type="tram"
        @close="favoriteOpen = false"
      />

      <q-list separator>
        <q-item-label header>Próximos tranvías</q-item-label>

        <q-item v-if="error">
          <q-item-section>
            <q-item-label>{{ error }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="error" color="negative" />
          </q-item-section>
        </q-item>

        <template v-if="estimations && estimations.estimates">
          <q-item v-for="(estimation, index) in estimations.estimates" :key="index">
            <q-item-section>
              <q-item-label>{{ estimation.line }} {{ estimation.direction }}</q-item-label>
              <q-item-label caption>{{ estimation.estimate }} minutos</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="access_time" />
            </q-item-section>
          </q-item>
        </template>

        <div v-if="!estimations.estimates && !error" class="flex flex-center q-pa-lg">
           <q-spinner color="primary" size="2em" />
        </div>
      </q-list>
    </q-pull-to-refresh>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { retrieveTramStopEstimation, retrieveAllTramStops } from '../services/data'
import FavoriteMarker from '../components/FavoriteMarker.vue'

const route = useRoute()
const router = useRouter()
const stationId = route.params.stationId

const estimations = ref({ estimates: [] })
const error = ref(null)
const stop = ref(null)
const favoriteOpen = ref(false)

const updateEstimations = async () => {
  error.value = null
  try {
    estimations.value = await retrieveTramStopEstimation(stationId)
  } catch (err) {
    error.value = err.message || 'No se han podido obtener los resultados'
  }
}

const refresher = async (done) => {
  await updateEstimations()
  done()
}

onMounted(async () => {
  updateEstimations()
  const allStops = await retrieveAllTramStops()
  stop.value = allStops.find(s => s.id === stationId)
})
</script>

