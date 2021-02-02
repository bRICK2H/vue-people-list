<template>
	<li class="sort-item"
		@click="addSort"
		:class="GET_CLASS_ACTIVE_SORT_ITEM(item)"
	>
		<span class="sort-item__icon"
			:style="GET_STYLE_ICON(item)"
		></span>
		{{ item.title }}
	</li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'cSortItem',
	props: {
		item: {
			type: Object,
			default: () => ({})
		},
		index: {
			type: Number,
			required: true
		},
	},
	data: () => ({
		isTouch: false,
	}),
	computed: mapGetters('sort', ['GET_CLASS_ACTIVE_SORT_ITEM', 'GET_STYLE_ICON', 'GET_IS_LOAD']),
	methods: {
		...mapActions('sort', ['ADD_SORT', 'ADD_ACTIVE_SORT_ITEM']),
		addSort() {
			this.ADD_ACTIVE_SORT_ITEM({
				isTouch: this.isTouch = !this.isTouch,
				index: this.index
			})
			this.ADD_SORT({
				type: this.item.type,
				typeOfSort: this.item.isActive
			});
		}
	},
	watch: {
		GET_IS_LOAD: {
			deep: true,
			handler({ index, typeOfSort }) {
				if (this.index === index) {
					this.isTouch = typeOfSort;
				}
			}
		},
	}
}
</script>

<style lang="scss">
	.sort-item {
		flex: 1 1 auto;
		position: relative;
		font-size: 2vmin;
		background-color: #1b1b1b;
		clip-path: polygon(1.5rem 0, 100% 0, calc(100% - 1.5rem) 100%, 0 100%);
		user-select: none;
		cursor: pointer;
		transition: .1s;

		&:hover {
			background-color: #616123;
		}

		&--asc {
			background: #707029;
			transform: translate(.1rem, -.2rem);
		}
		&--desc {
			background: #707029;
			transform: translate(-.1rem, .2rem);
		}

		&__icon {
			height: 100%;
			width: 2.5rem;
			background-repeat: no-repeat;
			background-size: contain;
			background-position: 50% 50%;
			transform: translate(-50%, -50%);
			filter: invert(.8);
			position: absolute;
			top: 50%;
			left: 3rem;
		}
	}
</style>