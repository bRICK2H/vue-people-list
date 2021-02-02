
import Vue from 'vue'
import router from '@/router'

const vm = new Vue

export default {
   namespaced: true,
   state: {
      queries: {}
   },
   mutations: {
      SET_QUERY_PARAMS_TO_URL: (state, params) => {
			state.queries = Object.assign({}, router.currentRoute.query, params);
			
         for (const param in state.queries) {
            if (!state.queries[param]) {
               vm.$delete(state.queries, param);
            }
         }

         router.push({ query: state.queries }).catch(err => {});
		},
		UPDATE_QUERY_PARAMS_IN_URL: (state, params) => {
			if(!Object.keys(params).length) return;

			Object.entries(params).forEach(curr => {
				const [type, values] = curr;
				if (!values.length) return;
				
				const filterQueries = state.queries[type]
					.split(',')
					.filter(queryVal => !values.includes(queryVal))
					.join(',');

				vm.$set(state.queries, type, filterQueries);
				
				if (!filterQueries.length) {
					vm.$delete(state.queries, type);
				}

				router.push({ query: state.queries }).catch(err => {});
			});
			
		},
   },
   actions: {
		ADD_QUERY_PARAMS_TO_URL: ({ commit }, params) => commit('SET_QUERY_PARAMS_TO_URL', params),
		CHANGE_QUERY_PARAMS_IN_URL: ({ commit }, params) => commit('UPDATE_QUERY_PARAMS_IN_URL', params),
      ADD_QUERY_PARAMS_TO_FILTER: ({ dispatch }, filters) => {
         filters.forEach(curr => {
            dispatch(`filters/ADD_FIELD_${curr.toUpperCase()}_FROM_URL`, curr, { root: true });
         })
      },
      ADD_QUERY_PARAMS_TO_SORT: ({ dispatch }, type) => {
         const curr_queries = router.currentRoute.query;

         for (const name in curr_queries) {
            if (name === type) {
               const [pre_name, post_name] = curr_queries[name].split('#');
               const typeOfSort = post_name === 'asc' ? true : false;

               dispatch('sort/ADD_ACTIVE_SORT_ITEM_FROM_URL', { type: pre_name, typeOfSort: typeOfSort }, { root: true })
               dispatch('sort/SET_SORT', { type: pre_name, typeOfSort: typeOfSort }, { root: true });
            }
         }
      }
   },
}