<template>
   <div id="app">
      <h1 class="title">People List</h1>
      <div class="content">
			<aside class="aside">
				<c-filter-list />
			</aside>
			<main class="main">
				<c-sort-list />
				<c-people-list />
				<c-pagination-list />
			</main>
   	</div>
   </div>
</template>

<script>
import cFilterList from '@/components/filters/c-filter-list'
import cPeopleList from '@/components/people/c-people-list'
import cSortList from '@/components/sort/c-sort-list'
import cPaginationList from '@/components/pagination/c-pagination-list'


export default { 
	name: 'App',
	components: {
      cPeopleList,
		cFilterList,
		cSortList,
		cPaginationList
   }
}
</script>

<style lang="scss">
   @import '@/assets/scss/main';
   #app {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
   }
   .title {
      font-size: 2.5vmax;
		color: #d3d34b;
		margin: 2rem 0 0;
      align-self: center;
   }
	.content {
      display: flex;
   }
   .aside {
      flex: 1 1 20%;
   }
   .main {
      flex: 1 1 80%;
   }
</style>