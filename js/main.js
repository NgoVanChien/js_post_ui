import axiosClient from './api/axiosClient'
import postApi from './api/postApi'

console.log('Hello from main.js')

async function main() {
  //   const reponse = await axiosClient.get('/posts')
  //   console.log(reponse)
  try {
    const queryParams = {
      _page: 1,
      _limit: 5,
    }
    const reponse = await postApi.getAll(queryParams)
    console.log(reponse)
  } catch (error) {}

  await postApi.updateFormData({
    id: 'sktwi1cgkkuif36dj',
    title: 'Dicta molestiae aut 22',
  })

  //   postApi.add({
  //     title: '',
  //     author: '',
  //     description: '',
  //     imgUrl: '',
  //   })
}

main()
