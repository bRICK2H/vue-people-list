import router from '@/router'
import Vue from 'vue'

const vm = new Vue

export default {
   state: {
      checkbox: {
         gender: {
            name: 'Gender',
            type: 'gender',
            isShow: false,
            writable: [],
            list: []
         },
         eye_color: {
            name: 'Eye color',
            type: 'eye_color',
            isShow: false,
            writable: [],
            list: []
         },
         hair_color: {
            name: 'Hair color',
            type: 'hair_color',
            isShow: false,
            writable: [],
            list: []
         },
         skin_color: {
            name: 'Skin color',
            type: 'skin_color',
            isShow: false,
            writable: [],
            list: []
         },
		},
		checkboxIcon: require('@/assets/icons/check.svg')
   },
   getters: {
      GET_CHECKBOX_GROUP: state => state.checkbox,
		GET_CHECKBOX: state => type => state.checkbox[type].writable,
		GET_MARKED_CHECKBOX_COLLECTION: state => {
			return Object.entries(state.checkbox)
				.reduce((acc, curr) => {
					const [type, { writable }] = curr;

					if (writable.length > 0) {
						acc[type] = writable;
					}

					return acc;
				}, {});
		},
		GET_IS_USED_CHECKBOX: state => {
			return Object.entries(state.checkbox)
				.reduce((acc, curr) => {
					const [type, { writable }] = curr;
					acc[type] = writable.length > 0;

					return acc;
				}, {});
		},
		GET_CHECKBOX_ICON: state => state.checkboxIcon 
   },
   mutations: {
      SET_CHECKBOX: (state, { value, type }) => state.checkbox[type].writable = value,
      SET_FIELD_CHECKBOX_FROM_URL: state => {
         const is_show_groups_checkbox = JSON.parse(localStorage.getItem('is_show_groups_checkbox'));

         Object.entries(is_show_groups_checkbox).forEach(curr => {
            const [type, isShow] = curr;
            state.checkbox[type].isShow = isShow;
         });
         
         Object.keys(state.checkbox).forEach(type => {
            const checkbox_from_url = router.currentRoute.query[type];

            if (checkbox_from_url) {
               checkbox_from_url.split(',').forEach(curr => {
                  state.checkbox[type].writable.push(curr);
                  state.checkbox[type].list.forEach(check => {
                     if (check.name === curr) {
                        check.isActive = true
                     }
                  })
               });
            }
         });
		},
		SET_ITEMS_CHECKBOX: (state, people) => {
			const queries = router.currentRoute.query,
					queries_keys = Object.keys(queries),
					result = {};

			Object.entries(state.checkbox)
				.forEach(curr => {
					const [type] = curr;
					result[type] = [];
					
					for (const types of Object.values(people)) {
						if (type in types) {
							result[type].push(types[type]);
						}
					}

					result[type] = Array
						.from(new Set(result[type].map(item => item)))
						.sort((a, b) => a.localeCompare(b))
						.map(name => {
							if (queries_keys.length > 0 && queries_keys.includes(type)) {
								if (queries[type].split(',').includes(name.replace(/, | /g, '-'))) {
									return { name: name.replace(/, | /g, '-'), isActive: true };
								}
							}

							return { name: name.replace(/, | /g, '-'), isActive: false };
						});

					state.checkbox[type].writable = [];
					state.checkbox[type].list = result[type];
				});
		},
		UPDATE_CHECKBOX: state => {
			Object.entries(router.currentRoute.query).forEach(curr => {
				const [type, values] = curr;
				
				if (type in state.checkbox) {
					const new_writable = values.split(',').reduce((acc, currName) => {
						if (state.checkbox[type].list.map(item => item.name).includes(currName)) {
							acc.push(currName);
						}

						return acc;
					}, []);

					vm.$set(state.checkbox[type], 'writable', new_writable);
				}
			});
		}
   },
   actions: {
      ADD_CHECKBOX: ({ commit, dispatch }, options) => {
         const { value, type } = options;

			commit('SET_CHECKBOX', options);
         dispatch('queries/ADD_QUERY_PARAMS_TO_URL', { [type]: value.join(',') }, { root: true });
      },
		ADD_FIELD_CHECKBOX_FROM_URL: ({ commit }) => commit('SET_FIELD_CHECKBOX_FROM_URL'),
		ADD_ITEMS_CHECKBOX: ({ commit }, results) => commit('SET_ITEMS_CHECKBOX', results),
		CHECK_PREVIOUS_MARKED_CHECKBOX_IN_PAGE_WITH_CURRENT: ({ commit, dispatch, state }) => {
			commit('UPDATE_CHECKBOX');

			const checkbox_query = {}
			
			for (const query in router.currentRoute.query) {
				if (query !== 'search' || query !== 'page') {
					checkbox_query[query] = router.currentRoute.query[query];
				}
			}

			if ('page' in checkbox_query ||
				('page' in checkbox_query && 'search' in checkbox_query)
				&& Object.keys(checkbox_query).length <= 2) return;

			const isset_value_in_curr_page = Object.entries(checkbox_query).reduce((acc, queryVal) => {
				const [type, values] = queryVal;

				acc[type] = values
					.split(',')
					.filter(currVal => !state.checkbox[type].list.map(curr => curr.name).includes(currVal));

				return acc;
			}, {});

			dispatch('queries/CHANGE_QUERY_PARAMS_IN_URL', isset_value_in_curr_page, { root: true });
		},
   }
}