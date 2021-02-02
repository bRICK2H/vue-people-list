import { get_people } from '@/api'

export default {
   namespaced: true,
   state: {
		currPage: 1,
		countPages: 2,
   },
   getters: {
		GET_COUNT_PAGES: state => state.countPages,
		GET_CLASS_CURR_PAGE: state => currPage => {
			return state.currPage === currPage ? 'pag-item--active' : '';
		}
   },
   mutations: {
		SET_COUNT_PAGES: (state, count) => state.countPages = count,
		SET_CURRENT_PAGE: (state, count) => state.currPage = count,
   },
   actions: {
      async GO_TO_ANOTHER_PAGE({ commit, dispatch }, page) {
         try {
				const { data: { results, next, previous } } = await get_people(page);
				
				if (!next) {
					const [, lastPage] = previous.split('=');

					dispatch('queries/ADD_QUERY_PARAMS_TO_URL', { page: +lastPage + 1 }, { root: true });
					dispatch('people/ADD_PEOPLE', results, { root: true });
					
					commit('SET_CURRENT_PAGE', +lastPage + 1);
					return;
				}				
				
            const [, currPage] = next.split('=');
						
				dispatch('filters/ADD_ITEMS_CHECKBOX', results, { root: true });
				dispatch('queries/ADD_QUERY_PARAMS_TO_URL', { page: +currPage - 1 }, { root: true });
				dispatch('filters/CHECK_PREVIOUS_MARKED_CHECKBOX_IN_PAGE_WITH_CURRENT', null, { root: true });
            dispatch('people/ADD_PEOPLE', results, { root: true });
   
				commit('SET_COUNT_PAGES', +currPage);
				commit('SET_CURRENT_PAGE', +currPage - 1);

         } catch(err) {
            console.error(err);
         }
      }
   },
}