<template>
   <li class="input-box filter-gender__input-box">
      <label class="input-box__label" :for="`${checkboxType}_${index}`"
         @click="checkboxItem.isActive = !checkboxItem.isActive"
			:class="{ 'input-box__label--active': checkboxItem.isActive }"
      >
			<img v-if="checkboxItem.isActive" 
				class="input-box__icon"
				:src="GET_CHECKBOX_ICON"
				alt="checkbox"
			>
      </label>
      <input :id="`${checkboxType}_${index}`"
         class="input-box__input"
         type="checkbox"
         :value="checkboxItem.name"
         v-model="checkValue"
      >
      <span class="input-box__name">{{ checkboxItem.name }} </span>
   </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
   name: 'cFilterCheckboxItem',
   props: {
      checkboxItem: {
         type: Object,
         require: true
      },
      checkboxType: {
         type: String,
         require: true
      },
      index: {
         type: Number,
         require: true
      },
   },
   computed: {
      ...mapGetters('filters', ['GET_CHECKBOX', 'GET_CHECKBOX_ICON']),
      checkValue: {
         get() {
            return this.GET_CHECKBOX(this.checkboxType);
         },
         set(value) {
            this.ADD_CHECKBOX({ value, type: this.checkboxType });
         }
		},
   },
   methods: {
		...mapActions('filters', ['ADD_CHECKBOX']),
   }
}
</script>

<style lang="scss">
.input-box {
   display: flex;
   align-items: center;

   &__input {
      display: none;
   }
   &__label {
      width: 2.5rem;
      height: 2.5rem;
      margin: .5rem 1rem .5rem .5rem;
      display: inline-block;
      background: #fff;
      border-radius: .3rem;
      cursor: pointer;

		&--active {
			background: #0174fe;
		}
   }
	&__icon {
		width: 100%;
		height: 100%;
		filter: invert(1);
	}
   &__name {
      display: inline-block;
      font-size: 2rem;
   }
}
</style>