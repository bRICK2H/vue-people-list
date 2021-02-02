import Vue from 'vue'
import Vuex from 'vuex'

import sort from './modules/sort'
import people from './modules/people'
import queries from './modules/queries'
import filters from './modules/filters'
import pagination from './modules/pagination'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sort,
    people,
    queries,
    filters,
    pagination
  }
})
