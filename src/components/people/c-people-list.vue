<template>
   <ul class="people-list">
      <c-person-item 
         v-for="(person, index) of GET_PEOPLE"
         :key="index"
         :person="person"
      />
      <div v-if="GET_IS_USED_FILTER && !GET_IS_CONTAINS_PEOPLE"
         class="people-list__nothing"
      >
         Ничего не найдено!
      </div>
   </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import cPersonItem from '@/components/people/inner-people-list/c-person-item'

export default {
   name: 'cPeopleList',
   components: {
      cPersonItem
   },
   computed: {
		...mapGetters('people', ['GET_PEOPLE', 'GET_IS_CONTAINS_PEOPLE']),
		...mapGetters('filters', ['GET_IS_USED_FILTER']),
   },
   methods: mapActions('people', ['FETCH_PEOPLE']),
   created() {
      this.FETCH_PEOPLE();
   }
}
</script>

<style lang="scss">
   .people-list {
      height: 75vh;
      margin: 0 1rem;
      overflow-y: auto;
      display: flex;
      justify-content: center;
		align-items: center;
      flex-wrap: wrap;
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

      &__nothing {
         font-size: 3rem;
         align-self: center;
      }
   }
</style>