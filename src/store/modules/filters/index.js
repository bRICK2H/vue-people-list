
import filterSearch from './filter-search'
import filterCheckboxGroup from './filter-checkbox-group'


export default {
   namespaced: true,
   state: {
		typeOfFilters: ['search', 'checkbox'],
		isUsedFilter: false,
	},
	getters: {
		GET_IS_USED_FILTER: (state, getters) => {
			const group_filters = state.typeOfFilters.reduce((acc, currType) => {
				Object.assign(acc, { ...getters[`GET_IS_USED_${currType.toUpperCase()}`] });
				return acc;
			}, {});

			return Object.entries(group_filters).some(curr => {
				const [, isUsed] = curr;
				return isUsed;
			});
		}
	},
   modules: {
      filterSearch,
      filterCheckboxGroup
   }
}