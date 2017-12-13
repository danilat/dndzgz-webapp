export const DndZgzRouter = (router) => {
  return { navigateToMap, navigateToBusDetail }

  function navigateToMap () {
    router.push({ name: MAP_ROUTE })
  }

  function navigateToBusDetail (id) {

  }
}

export const MAP_ROUTE = 'map'
