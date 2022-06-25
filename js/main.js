import postApi from './api/postApi'

async function main() {
  //   const reponse = await axiosClient.get('/posts')
  //   console.log(reponse)
  try {
    const queryParams = {
      _page: 1,
      _limit: 5,
    }
    const data = await postApi.getAll(queryParams)
    console.log('main.js data', data)
  } catch (error) {
    console.log('get all failed', error)
    // show modal, toast errors
  }

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
