<template>
  <q-page class="flex flex-center column no-wrap">
    <MapHeader title="Tranvía" class="full-width" />
    <MapWithMarkers
      v-if="stations.length > 0"
      icon="marker-tram.png"
      :markers="stations"
      :infoWindowContentFormatter="infoWindowContentFormatter"
      :infoWindowAction="goToDetail"
      class="full-width col-grow"
    />
    <div v-else class="flex flex-center col-grow">
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MapHeader from 'components/MapHeader.vue'
import MapWithMarkers from 'components/MapWithMarkers.vue'
import { retrieveAllTramStops } from '../services/data'

const stations = ref([])
const router = useRouter()

const infoWindowContentFormatter = (station) => {
  return station.title
}

const goToDetail = (marker) => {
  router.push({ name: 'tram', params: { stationId: marker.id } })
}

onMounted(async () => {
  try {
    stations.value = await retrieveAllTramStops()
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
