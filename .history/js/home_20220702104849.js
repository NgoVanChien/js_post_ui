import postApi from './api/postApi'
import { getUlPagination, setTextContent, truncateText } from './utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// to use fromNow Function
dayjs.extend(relativeTime)

function createPostElement(post) {
  if (!post) return

  // find  and clone template
  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return

  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  // update title, description, author, thumbnail

  // const titleElement = liElement.querySelector('[data-id="title"]')
  // if (titleElement) titleElement.textContent = post.title
  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  setTextContent(liElement, '[data-id="author"]', post.author)
  // const descriptionElement = liElement.querySelector('[data-id="description"]')
  // if (descriptionElement) descriptionElement.textContent = post.description

  // const authorElement = liElement.querySelector('[data-id="author"]')
  // if (authorElement) authorElement.textContent = post.author

  // calculate
  // console.log('timespan', dayjs(post.updatedAt).fromNow())
  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`)

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl

    thumbnailElement.addEventListener('error', () => {
      // console.log('load image error --> use default placeholder')
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail'
    })
  }

  // attach events

  return liElement
}

function renderPostList(postList) {
  if (!Array.isArray(postList) || postList.length === 0) return

  const ulElemnet = document.getElementById('postList')
  if (!ulElemnet) return

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElemnet.appendChild(liElement)
  })
}

function renderPagination(pagination) {
  const ulPagination = getUlPagination()
  if (!pagination || !ulPagination) return

  // calc totalRows
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  // save page and totalPows to ulPagination
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  // Check if Enable or Disable for Prev
  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild?.classList.remove('disabled')

  //  Check if Enable or Disable for Next
  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}

async function handleFilterChange(filterName, filterValue) {
  try {
    // update query params
    const url = new URL(window.location)
    url.searchParams.set(filterName, filterValue)
    history.pushState({}, '', url)

    // fetch API
    // re-render post list
    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('failed to fetch post list', error)
  }
}

function handlePrevClick(e) {
  e.preventDefault()
  console.log('prev click')
  const ulPagination = getUlPagination()
  if (!ulPagination) return

  const page = Numnber.parseInt(ulPagination.dataset.page) || 1
  if (page <= 1) return

  handleFilterChange('_page', page - 1)
}
function handleNextClick(e) {
  e.preventDefault()
  console.log('next click')

  const ulPagination = getUlPagination()
  if (!ulPagination) return

  const page = Numnber.parseInt(ulPagination.dataset.page || 1)
  const totalPages = ulPagination.dataset.totalPages
  if (page >= totalPages) return

  handleFilterChange('_page', page + 1)
}
cc

function initPagination() {
  // bind click event for  Prev/Next link
  const ulPagination = getUlPagination()
  if (!ulPagination) return

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink) {
    prevLink.addEventListener('click', handlePrevClick)
  }
  // add click event for prev link
  const NextLink = ulPagination.lastElementChild?.lastElementChild
  if (NextLink) {
    NextLink.addEventListener('click', handleNextClick)
  }
}

function initURL() {
  const url = new URL(window.location)

  // update search parmas if needed
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

  history.pushState({}, '', url)
}
;(async () => {
  try {
    // attach click event for links
    initPagination()

    // set default pagination (_page, _limit) on URL
    initURL()

    // render post list based URL params
    const queryParams = new URLSearchParams(window.location.search)
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination(pagination)
  } catch (error) {
    console.log('get all failed', error)
    // show modal, toast error
  }
})()
