import router from '@/router'

export default {
   state: {
      search: '',
		placeholder: 'Search of name...',
   },
   getters: {
		GET_FIELD_SEARCH: state => state.search,
		GET_IS_USED_SEARCH: state => ({ search: !!state.search }),
		GET_PLACEHOLDER: state => state.placeholder,
   },
   mutations: {
      SET_FIELD_SEARCH: (state, value) => state.search = value,
      SET_TOGGLE_PLACEHOLDER: (state, type) => {
         if (type === 'focus') {
            state.placeholder = ''
         } else {
            state.placeholder = 'Search of name...'
         }
      },
      SET_FIELD_SEARCH_FROM_URL: (state, type) => {
			const search_from_url = router.currentRoute.query[type];
         
         if (search_from_url) {
            state.search = search_from_url;
         }
		},
   },
   actions: {
      ADD_FIELD_SEARCH: ({ commit, dispatch, state }, value) => { 
			commit('SET_FIELD_SEARCH', value);
			dispatch('queries/ADD_QUERY_PARAMS_TO_URL', { search: state.search }, { root: true });
		},
      TOGGLE_PLACEHOLDER: ({ commit }, type) => commit('SET_TOGGLE_PLACEHOLDER', type),
      ADD_FIELD_SEARCH_FROM_URL: ({ commit }, type) => commit('SET_FIELD_SEARCH_FROM_URL', type)
   }
}