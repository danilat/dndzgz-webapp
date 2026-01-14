<template>
  <q-page class="flex flex-center column no-wrap">
    <MapHeader title="Taxi" class="full-width" />
    <MapWithMarkers
      v-if="stations.length > 0"
      icon="marker-taxis.png"
      :markers="stations"
      :infoWindowContentFormatter="infoWindowContentFormatter"
      :infoWindowAction="null" 
      class="full-width col-grow"
    />
    <div v-else class="flex flex-center col-grow">
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MapHeader from 'components/MapHeader.vue'
import MapWithMarkers from 'components/MapWithMarkers.vue'
import { retrieveAllTaxiStops } from '../services/data'

const stations = ref([])

const infoWindowContentFormatter = (station) => {
  return station.title
}

// Taxi usually doesn't have detail page in legacy? 
// Legacy ServiceList had goToTaxiMap.
// Legacy commands had retrieveAllTaxiStops.
// Legacy router had TAXIS_MAP_ROUTE, but NO detail route for taxi (only Bizi, Tram, Bus).
// So 'infoWindowAction' is null.

onMounted(async () => {
  try {
    stations.value = await retrieveAllTaxiStops()
  } catch (error) {
    console.error('Failed to load stations', error)
  }
})
</script>

<style scoped>
.col-grow {
  flex-grow: 1;
}
</style>
