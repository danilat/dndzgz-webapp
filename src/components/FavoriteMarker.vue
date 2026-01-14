<template>
  <q-dialog v-model="internalOpened" @hide="close">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Nombre de favorito</div>
        <div class="text-caption">Dale un nombre a tu favorito para acordarte más adelante</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="name"
          autofocus
          placeholder="Ej: para ir a clase..."
          @keyup.enter="saveAndClose"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cerrar" color="warning" @click="close" />
        <q-btn flat label="Guardar" color="primary" @click="saveAndClose" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { markAsFavorite } from '../services/data'

const props = defineProps({
  opened: Boolean,
  point: { type: Object, required: true },
  type: { type: String, required: true }
})

const emit = defineEmits(['update:opened', 'close'])

const internalOpened = ref(props.opened)
const name = ref('')

watch(() => props.opened, (val) => {
  internalOpened.value = val
})

watch(internalOpened, (val) => {
  emit('update:opened', val)
})

const close = () => {
  internalOpened.value = false
  emit('close')
}

const saveAndClose = () => {
  if (name.value.trim()) {
    markAsFavorite(name.value, props.point, props.type)
    close()
    name.value = ''
  }
}
</script>
