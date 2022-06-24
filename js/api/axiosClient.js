import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: {
    'Conten-Type': 'application/json',
  },
})

export default axiosClient
