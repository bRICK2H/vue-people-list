<template>
   <div class="pagination">
      <c-pagination-item
         v-for="page in GET_COUNT_PAGES"
         :key="page"
         :currPage="page"
      />
   </div>
</template>

<script>
import { mapGetters } from 'vuex'

import cPaginationItem from '@/components/pagination/inner-pagination-list/c-pagination-item'

export default {
   name: 'cPaginationList',
   components: {
      cPaginationItem
   },
   computed: mapGetters('pagination', ['GET_COUNT_PAGES']),
}
</script>

<style lang="scss">
.pagination {
	margin: 2rem 0;
   display: flex;
   justify-content: center;

   &__pag-item {
      margin: 0 .4rem;
   }
}
</style>