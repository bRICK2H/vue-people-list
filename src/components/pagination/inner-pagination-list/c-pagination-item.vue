<template>
   <span class="pag-item pagination__pag-item"
      @click="GO_TO_ANOTHER_PAGE(currPage)"
		:class="GET_CLASS_CURR_PAGE(currPage)"
   >
      {{ currPage }}
   </span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
   name: 'cPaginationItem',
   props: {
      currPage: {
         type: Number,
         required: true
      }
	},
	computed: mapGetters('pagination', ['GET_CLASS_CURR_PAGE']),
   methods: mapActions('pagination', ['GO_TO_ANOTHER_PAGE'])
}
</script>

<style lang="scss">
   .pag-item {
      width: 3rem;
      height: 3rem;
      background: #393a39;
      border-radius: .5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

		&--active {
			background: #0174fe;
		}
   }
</style>