import Vue from 'vue'
Vue.prototype.$q = {theme: 'mat'}
Vue.config.productionTip = false

function resolveAll() {
  return new Promise(resolve => setImmediate(resolve))
}

global.resolveAll = resolveAll
