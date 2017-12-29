export const DndZgzRouter = (router) => {
  return {
    navigateToMap,
    navigateToBiziMap,
    navigateToTaxiMap,
    navigateToTramMap,
    navigateToBusDetail,
    navigateToBiziDetail,
    navigateToServiceList,
    navigateToTramDetail,
    getParam
  }

  function navigateToMap () {
    router.push({ name: BUS_MAP_ROUTE })
  }

  function navigateToBiziMap () {
    router.push({ name: BIZI_MAP_ROUTE })
  }

  function navigateToTaxiMap () {
    router.push({ name: TAXIS_MAP_ROUTE })
  }

  function navigateToTramMap () {
    router.push({ name: TRAM_MAP_ROUTE })
  }

  function navigateToTramDetail (id) {
    router.push({ name: TRAM_DETAIL_ROUTE, params: {tramId: id} })
  }

  function navigateToBusDetail (id) {
    router.push({ name: BUS_DETAIL_ROUTE, params: {busId: id} })
  }

  function navigateToBiziDetail (id) {
    router.push({ name: BIZI_DETAIL_ROUTE, params: {stationId: id} })
  }

  function navigateToServiceList () {
    router.push({ name: SERVICE_LIST_ROUTE })
  }

  function getParam (param) {
    return router.currentRoute.params[param]
  }
}

export const BUS_MAP_ROUTE = 'bus_map'
export const BIZI_MAP_ROUTE = 'bizi_map'
export const TAXIS_MAP_ROUTE = 'taxis_map'
export const TRAM_MAP_ROUTE = 'tram_map'
export const BUS_DETAIL_ROUTE = 'bus'
export const BIZI_DETAIL_ROUTE = 'bizi'
export const TRAM_DETAIL_ROUTE = 'tram'
export const SERVICE_LIST_ROUTE = 'servicesList'
