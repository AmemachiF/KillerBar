export const state = () => ({
  breadcrumbItems: []
})

export const mutations = {
  breadcrumbItems (state, items) {
    state.breadcrumbItems = items
  }
}
