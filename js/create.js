import { editor } from "./editor.js"

const publishBtn = document.querySelector('.publish')

const createPost = async (e) => {
  e.preventDefault()
  const savedData = await editor.save()

  if (savedData.blocks.length !== 0) {
    const doc = {
      body: savedData,
      date: savedData.time
    }
    
    await fetch('http://localhost:8000/posts', {
      method: 'POST',
      body: JSON.stringify(doc),
      headers: { 'Content-Type': 'application/json' }
    })
    
    window.location.replace('/index.html')
  }
}

publishBtn.addEventListener('click', createPost)

