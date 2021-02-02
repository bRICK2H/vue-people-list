<template>
   <li class="person-item people-list__person-item">
      
      <h2 class="person-item__name">{{ person.name }}</h2>

		<div class="container-props">
			<div class="box-props container-props__box-props">
				<span class="box-props__item">gender: {{ person.gender }}</span>
				<span class="box-props__item">birth_year: {{ person.birth_year }}</span>
				<span class="box-props__item">mass: {{ person.mass }}</span>
				<span class="box-props__item">height: {{ person.height }}</span>
			</div>
			<div class="box-props container-props__box-props">
				<span class="box-props__item">eye_color: {{ person.eye_color }}</span>
				<span class="box-props__item">hair_color: {{ person.hair_color }}</span>
				<span class="box-props__item">skin_color: {{ person.skin_color }}</span>
				<span class="box-props__item">created: {{ person.created | modifyDate }}</span>
			</div>
		</div>
      
   </li>
</template>

<script>
export default {
   name: 'cPersonItem',
   props: {
      person: {
         type: Object,
         default: () => ({})
      }
   },
   filters: {
		modifyDate(val) {
			const date = new Date(val),
					day = date.getDate(),
					month = date.getMonth() + 1,
               year = date.getFullYear();
         const modify_number = val => {
            return val < 10 ? `0${val}` : val;
         }
			return `${modify_number(day)}.${modify_number(month)}.${year}`
		}
	},
}
</script>

<style lang="scss">
   .person-item {
      min-width: 20rem;
      flex: 0 1 30%;
      margin: 1rem;
      padding: 1.2rem;
      border-radius: 1rem;
      background-color: #000000;
      box-shadow: 0 0 .5rem #a59bb6;
      cursor: pointer;
      transition: .2s;
      backface-visibility: hidden;

      &:hover {
         transform: scale(1.02);
         background: #0b0b0b;
      }

      &__name {
         font-size: 1.8vmax;
			margin-bottom: 1.5rem;
         color: #cfcfcf;
         text-align: center;
      }
   }

	.container-props {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		&__box-props {
			display: flex;
			flex-direction: column;
		}
	}

	.box-props {
		&__item {
			font-size: 1vmax;
			color: #ddd;
			line-height: 1.2;
		}
	}
</style>