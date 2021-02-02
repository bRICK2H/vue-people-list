import Vue from 'vue'

const vm = new Vue

export default {
   namespaced: true,
   state: {
      sortList: [
         { id: 1, title: 'Name', type: 'name' },
         { id: 2, title: 'Gender', type: 'gender' },
         { id: 3, title: 'Brith year', type: 'birth_year' },
         { id: 4, title: 'Mass', type: 'mass' },
         { id: 5, title: 'Height', type: 'height' },
         { id: 6, title: 'Created', type: 'created' },
      ],
      icons: {
         up: require('@/assets/icons/up.svg'),
         down: require('@/assets/icons/down.svg')
      },
      isLoad: {
         index: null,
         typeOfSort: null
      },
   },
   getters: {
      GET_SORT_LIST: state => state.sortList,
      GET_IS_LOAD: state => state.isLoad,
      GET_ISONS: state => state.icons,
      GET_CLASS_ACTIVE_SORT_ITEM: () => item => {
         if (!('isActive' in item)) return;
         return item.isActive ? 'sort-item--asc' : 'sort-item--desc'
      },
      GET_STYLE_ICON: state => item => {
         if (!('isActive' in item)) return;
         return item.isActive
            ? `background-image: url(${state.icons.up})`
            : `background-image: url(${state.icons.down})`
      }
   },
   mutations: {
      SET_SORT: (s, { type, typeOfSort, people }) => {
         const format_birth_year = val => {
            return parseFloat(val) || 0;
         }
         people.sort(({ [type]: a }, { [type]: b }) => {
            switch (type) {
               case 'name':
               case 'gender':
                  return typeOfSort
                     ? a.localeCompare(b)
                     : b.localeCompare(a);
               case 'birth_year':
                  return typeOfSort
                     ? format_birth_year(a) - format_birth_year(b)
                     : format_birth_year(b) - format_birth_year(a);
               case 'mass':
               case 'height':
                  return typeOfSort
                     ? parseInt(a) - parseInt(b)
                     : parseInt(b) - parseInt(a);
               case 'created':
                  return typeOfSort
                     ? Date.parse(a) - Date.parse(b)
                     : Date.parse(b) - Date.parse(a);
            }
         });
      },
      SET_ACTIVE_SORT_ITEM: (state, { isTouch, index }) => {
         state.sortList.forEach(curr => {
            if ('isActive' in curr) {
               vm.$delete(curr, 'isActive');
            }
         });

         vm.$set(state.sortList[index], 'isActive', isTouch);
      },
      SET_ACTIVE_SORT_ITEM_FROM_URL: (state, { type, typeOfSort }) => {
         const get_curr_index = state.sortList.findIndex(curr => curr.type === type);
         vm.$set(state.sortList[get_curr_index], 'isActive', typeOfSort);
         state.isLoad = {
            index: get_curr_index,
            typeOfSort
         };

      }
   },
   actions: {
      ADD_SORT: ({ dispatch }, options) => {
         const { type, typeOfSort } = options;
         const modifyType = typeOfSort ? `${type}#asc` : `${type}#desc`;

         dispatch('SET_SORT', options);
         dispatch('queries/ADD_QUERY_PARAMS_TO_URL', { sort: modifyType }, { root: true });
      },
      SET_SORT: ({ commit, rootState }, options) => {
         const { people: { peopleList } } = rootState;

         commit('SET_SORT', {
            ...options,
            people: peopleList
         });
      },
      ADD_ACTIVE_SORT_ITEM: ({ commit }, options) => commit('SET_ACTIVE_SORT_ITEM', options),
      ADD_ACTIVE_SORT_ITEM_FROM_URL: ({ commit }, options) => commit('SET_ACTIVE_SORT_ITEM_FROM_URL', options)
   }
}