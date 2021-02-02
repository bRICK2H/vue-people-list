import axios from 'axios'

const config = {
	root: 'https://swapi.dev/api',
	category: '/people/',
	default_page: 1
}

const { root, category, default_page } = config;

const get_people = (page = default_page) => {
	return axios.get(`${root}${category}`,
		{ params: { page } }
	)
}
export { get_people };