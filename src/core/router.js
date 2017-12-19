export const DndZgzRouter = (router) => {
  return { navigateToMap, navigateToBiziMap, navigateToBusDetail, navigateToBiziDetail, navigateToServiceList, getParam }

  function navigateToMap () {
    router.push({ name: BUS_MAP_ROUTE })
  }

  function navigateToBiziMap () {
    router.push({ name: BIZI_MAP_ROUTE })
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
export const BUS_DETAIL_ROUTE = 'bus'
export const BIZI_DETAIL_ROUTE = 'bizi'
export const SERVICE_LIST_ROUTE = 'servicesList'
