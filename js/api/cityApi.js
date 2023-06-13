import axiosClient from './axiosClient'

// import: default || named
// export: defailt || named
// default: can use my name --> have one dafault export ONLY
// Named export: use exactly name --> have multiple exports

// ---------------------------

export function gettAllCities(params) {
  const url = '/cities'
  return axiosClient.get(url, { params })
}

// Tree Shaking

// NAMED EXPORT
export function getCityById(id) {
  const url = `/cities${id}`
  return axiosClient.get(url)
}

// const cityApi = {
//   getAll(params) {
//     const url = '/posts'
//     return axiosClient.get(url, { params })
//   },

//   getbyId(id) {
//     const url = `/posts/${id}`
//     return axiosClient.get(url)
//   },

//   add(data) {
//     const url = `/posts/`
//     return axiosClient.post(url, data)
//   },

//   update(data) {
//     const url = `/posts/${data.id}`
//     return axiosClient.patch(url, data)
//   },

//   updateFormData(data) {
//     const url = `/posts/${data.id}`
//     return axiosClient.patch(url, data, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       //   baseURL
//       // params
//     })
//   },

//   remove(id) {
//     const url = `/posts/${id}`
//     return axiosClient.delete(url)
//   },
// }

export default cityApi
