<template>
	<ul class="sort-list">
		<c-sort-item class="sort-list__sort-item"
			v-for="(item, index) of GET_SORT_LIST"
			:key="item.id"
			:item="item"
			:index="index"
		/>
	</ul>
</template>

<script>
import { mapGetters } from 'vuex'
import cSortItem from '@/components/sort/inner-sort-list/c-sort-item'

export default {
	name: 'cSortList',
	components: {
		cSortItem,
	},
	computed: mapGetters('sort', ['GET_SORT_LIST']),
}
</script>

<style lang="scss">
	.sort-list {
		height: 4rem;
		margin: 2rem 4rem;
		display: flex;
		clip-path: polygon(1.5rem 0, 100% 0, calc(100% - 1.5rem) 100%, 0 100%);
		border: 1px solid #d3d34b;
		display: flex;
		align-items: center;

		&__sort-item {
			height: 90%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>