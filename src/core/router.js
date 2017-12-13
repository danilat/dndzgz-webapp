export const DndZgzRouter = (router) => {
  return { navigateToMap, navigateToBusDetail }

  function navigateToMap () {
    router.push(MAP_PATH)
  }

  function navigateToBusDetail (id) {

  }
}

export const MAP_PATH = 'map'
