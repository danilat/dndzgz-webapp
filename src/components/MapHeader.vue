<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="arrow_back" @click="goBack" />
    <q-toolbar-title>
      {{ title }}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  title: {
    type: String,
    required: true
  }
})

const router = useRouter()

const goBack = () => {
  // Logic from legacy: navigateToServiceList usually means home in this app structure?
  // Or just try history back.
  // If no history, replace with home.
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
