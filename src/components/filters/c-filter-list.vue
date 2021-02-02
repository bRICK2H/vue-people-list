<template>
   <div class="filter-container">
      <c-filter-search />
      <c-filter-checkbox-group />
   </div>
</template>

<script>
import cFilterSearch from '@/components/filters/inner-filter-list/c-filter-search'
import cFilterCheckboxGroup from '@/components/filters/inner-filter-list/c-filter-checkbox-group'

export default {
   name: 'cFilterList',
   components: {
      cFilterSearch,
      cFilterCheckboxGroup
   },
}
</script>

<style lang="scss">
   .filter-container {
      height: 100%;
      padding: 0 2rem;
   }
</style>