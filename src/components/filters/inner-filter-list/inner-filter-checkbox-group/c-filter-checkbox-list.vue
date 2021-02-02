<template>
   <div class="filter-checkbox">
      <h2 class="filter-checkbox__title-box">
         <span class="filter-checkbox__title">{{ checkbox.name }}</span>
			<button class="filter-checkbox__toggle-show"
				:style="setStyleToggleInputList"
				@click="checkbox.isShow = !checkbox.isShow"
			></button>
      </h2>
		
		<transition name="input-list">
			<ul v-if="checkbox.isShow">
				<c-filter-checkbox-item
					v-for="(value, index) of checkbox.list"
					:key="index"
					:checkbox-item="value"
					:checkbox-type="checkbox.type"
					:index="index"
				/>
			</ul>
		</transition>
		
   </div>
</template>

<script>
import cFilterCheckboxItem from '@/components/filters/inner-filter-list/inner-filter-checkbox-group/inner-filter-checkbox-list/c-filter-checkbox-item'

export default {
	name: 'cFilterCheckboxList',
	props: {
		checkbox: {
			type: Object,
			require: true
		}
	},
	components: {
		cFilterCheckboxItem
	},
	data: () => ({
		isInputList: false,
		icons: {
			up: require('@/assets/icons/up.svg'),
			down: require('@/assets/icons/down.svg')
		}
	}),
   computed: {
		setStyleToggleInputList() {
			return this.checkbox.isShow
				? `background-image: url(${this.icons.up})`
				: `background-image: url(${this.icons.down})`
		}
   },
   
}
</script>

<style lang="scss">
	.filter-checkbox {

		&__title-box {
			font-size: 3rem;
			display: flex;
			align-items: center;
			margin: 1.5rem 0 1.5rem;
		}
		&__title {
			margin-right: 1rem;
		}
		&__toggle-show {
			width: 1.7rem;
			height: 1.7rem;
			background-color: transparent;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 50% 50%;
			border: none;
			border-radius: .3rem;
			filter: invert(1)
		}
	}

	.input-list-enter-active {
		transform: translateX(-20vw);
		animation: input-list-enter .2s
	}

	@keyframes input-list-enter {
		100% { transform: translateX(0) }
	}

	.input-list-leave-active {
		transform: translateX(0);
		animation: input-list-leave .2s
	}

	@keyframes input-list-leave {
		100% { transform: translateX(-20vw); opacity: 0; }
	}
</style>