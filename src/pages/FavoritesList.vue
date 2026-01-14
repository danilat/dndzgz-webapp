<template>
  <q-page class="column">
    <MapHeader title="Favoritos" />
    <q-list separator v-if="favorites.length > 0">
      <q-item
        v-for="fav in favorites"
        :key="fav.id"
        clickable
        v-ripple
        @click="goToFavorite(fav)"
      >
        <q-item-section avatar>
          <img :src="getIcon(fav.type)" width="32" height="32" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ fav.name || fav.title }}</q-item-label>
          <q-item-label caption>{{ formatType(fav.type) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else class="flex flex-center q-pa-md col-grow">
      <div class="text-center text-grey">
        <q-icon name="favorite_border" size="4em" />
        <p class="q-mt-sm">No tienes favoritos guardados.</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MapHeader from 'components/MapHeader.vue'
import { retrieveAllFavorites } from '../services/data'

const favorites = ref([])
const router = useRouter()

onMounted(() => {
  favorites.value = retrieveAllFavorites()
})

const getIcon = (type) => {
  switch (type) {
    case 'bus': return 'marker-bus.png'
    case 'bizi': return 'marker-bizi.png'
    case 'tram': return 'marker-tram.png'
    case 'taxis': return 'marker-taxis.png'
    default: return 'marker-favorite.png'
  }
}

const formatType = (type) => {
  switch (type) {
    case 'bus': return 'Autobús'
    case 'bizi': return 'Bizi'
    case 'tram': return 'Tranvía'
    case 'taxis': return 'Taxi'
    default: return type
  }
}

const goToFavorite = (fav) => {
  if (fav.type === 'bus') {
    router.push({ name: 'bus', params: { busId: fav.id } })
  } else if (fav.type === 'tram') {
    router.push({ name: 'tram', params: { stationId: fav.id } })
  } else if (fav.type === 'bizi') {
    router.push({ name: 'bizi', params: { stationId: fav.id } })
  } else if (fav.type === 'taxis') {
    router.push({ name: 'taxi_map' })
  }
}
</script>

<style scoped>
.col-grow {
  flex-grow: 1;
}
</style>
