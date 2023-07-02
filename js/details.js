const id = new URLSearchParams(window.location.search).get('id')
const container = document.querySelector('.details')
const deleteBtn = document.querySelector('.delete')
const editBtn = document.querySelector('.edit')

let template = ''
let paragraph = ''
let header = ''

const renderDetails = async () => {
  const res = await fetch('http://localhost:8000/posts/' + id)
  const post = await res.json()
  let blocks = post.body.blocks
  
  blocks.forEach(block => {
    let blockType = block.type
    let paragraphText = block.data.text
    let headerText = block.data.text
    let headerLevel = block.data.level

    if (blockType === 'header') {
      header += `<h${headerLevel}>${headerText}</h${headerLevel}>`
    } else if (blockType === 'paragraph') {
      paragraph += `<p>${paragraphText}</p>`
    }
  });
  
  template = ` ${header}${paragraph}`
  
  container.innerHTML = template
}


editBtn.addEventListener('click', () => {
  window.location.replace(`/edit.html?id=${id}`)
})

deleteBtn.addEventListener('click', async () => {
  const res = await fetch(' http://localhost:8000/posts/' + id, {
    method: 'DELETE'
  })
  window.location.replace('/index.html')
})

window.addEventListener('DOMContentLoaded', () => renderDetails())