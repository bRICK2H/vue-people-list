<template>
   <div class="filter-search">
      <input class="input-search"
         type="text"
         :placeholder="GET_PLACEHOLDER"
         v-model.trim="search"
         @focus="TOGGLE_PLACEHOLDER($event.type)"
         @blur="TOGGLE_PLACEHOLDER($event.type)"
      >
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
   name: 'cFilterSearch',
   computed: {
      ...mapGetters('filters', [
         'GET_FIELD_SEARCH',
         'GET_PLACEHOLDER',
      ]),
      search: {
         get() {
            return this.GET_FIELD_SEARCH;
         },
         set(value) {
            this.ADD_FIELD_SEARCH(value);
         }
      }
   },
   methods: {
      ...mapActions('filters', [
         'ADD_FIELD_SEARCH',
         'TOGGLE_PLACEHOLDER',
         'FIND_SEARCH_RESULTS'
      ]),
   }
}
</script>

<style lang="scss">
   .filter-search {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 2.25rem 0;
   }
   .input-search {
      width: 100%;
      height: 3.5rem;
      clip-path: polygon(1.5rem 0, 100% 0, calc(100% - 1.5rem) 100%, 0 100%);
      border: none;
      padding: 1rem 3rem;
   }
</style>