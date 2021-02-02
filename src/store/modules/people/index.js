import { get_people } from '@/api'

export default {
   namespaced: true,
   state: {
		peopleList: [],
   },
   getters: {
      GET_PEOPLE: (state, g, rs, rootGetters) => {
			const search = rootGetters['filters/GET_FIELD_SEARCH'],
					reg_exp = new RegExp(search, 'i'),
					marked_checkbox_collection = rootGetters['filters/GET_MARKED_CHECKBOX_COLLECTION'],
					keys_of_marked_checkbox_collection = Object.keys(marked_checkbox_collection);

			return state.peopleList.filter(currPeople => {
				const is_checked_filter = keys_of_marked_checkbox_collection.every(currCheckbox => {
					return marked_checkbox_collection[currCheckbox].includes(currPeople[currCheckbox]);
				});

				return reg_exp.test(currPeople.name) && keys_of_marked_checkbox_collection.length > 0
					? is_checked_filter
					: reg_exp.test(currPeople.name);
			});
		},
		GET_IS_CONTAINS_PEOPLE: (s, getters) => !!getters.GET_PEOPLE.length,
   },
   mutations: {
      SET_PEOPLE: (state, people) => state.peopleList = people,
   },
   actions: {
      async FETCH_PEOPLE({ dispatch, rootState }) {
			try {
				const { data: { results, next } } = await get_people();
				const [, nextPage] = next.split('=');
				const type_of_filters = rootState.filters.typeOfFilters;
				

				dispatch('queries/ADD_QUERY_PARAMS_TO_URL', { page: +nextPage - 1 }, { root: true });
				dispatch('filters/ADD_ITEMS_CHECKBOX', results, { root: true });
            dispatch('queries/ADD_QUERY_PARAMS_TO_SORT', 'sort', { root: true });
				dispatch('queries/ADD_QUERY_PARAMS_TO_FILTER', type_of_filters, { root: true });
				dispatch('ADD_PEOPLE', results);
			} catch(err) {
				console.error(err);
			}
      },
      ADD_PEOPLE: ({ commit }, results) => commit('SET_PEOPLE', results)
   }
}