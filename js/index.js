import { writeFullDate } from "./getFullDate.js"
import { handlePagination } from "./addPagination.js"
const container = document.querySelector('.blogs')
const searchForm = document.querySelector('.search')

export const renderPosts = async (term, page) => {

  let uri = `http://localhost:8000/posts?_page=${page}&_limit=5&_sort=date&_order=desc`

  if (term) {
    uri += `&q=${term}`
  }

  const res = await fetch(uri)
  const posts = await res.json()
  
  let template = ''
  let paragraph = ''
  let header = ''

  posts.forEach(post => {
    let time = post.body.time   
    let blocks = post.body.blocks

    paragraph = ''
    header = ''

    blocks.forEach(block => {
      let blockType = block.type
      let headerLevel = block.data.level
      let headerText = block.data.text
      let paragraphText = block.data.text

      if (blockType === 'header') {
        header += `<h${headerLevel}>${headerText}</h${headerLevel}>`
      } else if (blockType === 'paragraph') {
        paragraph += `${paragraphText}`
      }
    })

    template += `
    <div class="post">
      ${header}
      <p>${paragraph.slice(0, 500)}</p>
      <p><small>${writeFullDate(time)}</small></p>
      <a href="/details.html?id=${post.id}">read more...</a>
    </div>`
  });
  container.innerHTML = template
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  renderPosts(searchForm.term.value.trim())
})

setTimeout(() => {
  const paginationButtons = document.querySelectorAll('.paginationBtn')
  paginationButtons.forEach(button => { 
    button.addEventListener('click', handlePagination)
  })
}, 1000)

window.addEventListener('DOMContentLoaded', () => renderPosts('', 1))
