import { renderPosts } from "./index.js"
const pagination = document.querySelector('.pagination')

pagination.innerHTML = `
<a class="paginationBtn leftArrow">&laquo;</a>
<a class="paginationBtn active firstPage">1</a>
<a class="paginationBtn rightArrow">&raquo;</a>`

const rightArrow = document.querySelector('.rightArrow')
const leftArrow = document.querySelector('.leftArrow')
console.log(rightArrow);
console.log(pagination.lastChild);

const renderPostsPagination = async () => {
  let uri = 'http://localhost:8000/posts'

  const res = await fetch(uri)
  const posts = await res.json()

  let postLength = posts.length
  console.log(postLength);

  if (postLength > 4) {
    let pageNumber = Math.ceil((postLength) / 5) 
    console.log(pageNumber);
    for (let i = 2; i <= pageNumber; i++) {
      let newNode = document.createElement('a')
      newNode.classList.add('paginationBtn')
      let textNode = document.createTextNode(i)
      newNode.appendChild(textNode)
      pagination.insertBefore(newNode, pagination.lastChild)
    }
  }
  handleBlocked()
}

renderPostsPagination()

export function handlePagination (e) {

  if ( e.target.innerText === '»') {
    if (!e.target.previousElementSibling.classList.contains('active')) {
      const activeBtn = document.querySelector('.active')
      console.log(+activeBtn.innerText + 1);
      renderPosts('', (+activeBtn.innerText + 1))
      activeBtn.nextElementSibling.classList.add('active')
      activeBtn.classList.remove('active')
    } 

  } else if ( e.target.innerText === '«') {
    if (!e.target.nextElementSibling.classList.contains('active')) {
      const activeBtn = document.querySelector('.active')
      console.log(+activeBtn.innerText - 1);
      renderPosts('', (+activeBtn.innerText - 1))
      activeBtn.previousElementSibling.classList.add('active')
      activeBtn.classList.remove('active')
    } 
  }

  if (!e.target.classList.contains('active') && e.target.innerText !== '»' && e.target.innerText !== '«') {
    console.log(e.target.innerText);
    renderPosts('', e.target.innerText)
    const activeBtn = document.querySelector('.active')
    activeBtn.classList.remove('active')
    e.target.classList.add('active') 
  }
  handleBlocked()
}

function handleBlocked () {

  if (leftArrow.nextElementSibling.classList.contains('active')) {
    leftArrow.classList.add('blocked')
  } else {
    leftArrow.classList.remove('blocked')
  }

  if (rightArrow.previousElementSibling.classList.contains('active')) {
    rightArrow.classList.add('blocked')
  } else {
    rightArrow.classList.remove('blocked')
  }   

}
