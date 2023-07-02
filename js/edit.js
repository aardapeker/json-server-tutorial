import { editor } from "./editor.js";

const id = new URLSearchParams(window.location.search).get('id')
const updateBtn = document.querySelector('.update')

const renderEditor = async () => {

  const res = await fetch('http://localhost:8000/posts/' + id)
  const post = await res.json()
  const noteData = post.body.blocks

  setTimeout(() => {
    editor.render({
      blocks: noteData
    })
  },1000);  
}

const savePost = async (e) => {
  e.preventDefault()

  const savedData = await editor.save()
  if (savedData.blocks.length !== 0) {
    const doc = {
      body: savedData,
      date: savedData.time
    }
    await fetch('http://localhost:8000/posts/' + id, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(doc)
    })
    window.location.replace('/index.html')
  }
}

renderEditor()

updateBtn.addEventListener('click', savePost)

