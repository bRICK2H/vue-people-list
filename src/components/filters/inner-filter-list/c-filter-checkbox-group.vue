<template>
   <div class="checkbox-group">
      <cFilterCheckboxList 
         v-for="(value, key) in GET_CHECKBOX_GROUP"
         :key="key"
         :checkbox="value"
      />
   </div>
</template>

<script>
import { mapGetters } from 'vuex'

import cFilterCheckboxList from '@/components/filters/inner-filter-list/inner-filter-checkbox-group/c-filter-checkbox-list'

export default {
   name: 'cFilterCheckboxGroup',
   components: {
      cFilterCheckboxList
   },
   computed: mapGetters('filters', ['GET_CHECKBOX_GROUP'])
}
</script>

<style lang="scss">
   .checkbox-group {
      height: 80vh;
      overflow-y: auto;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
         width: .5rem;
      }
      &::-webkit-scrollbar-track {
         background: rgba(255, 255, 255, .1);
      }
      &::-webkit-scrollbar-thumb {
         background-color: #ccc;
         border-radius: 5px;
      }
   }
</style>