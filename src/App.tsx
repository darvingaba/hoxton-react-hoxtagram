import { useState } from 'react'
import './App.css'

type Post = {
  id: number
  title: string
  likes: number
  image: string
}

function App() {
  const [images, setImages] = useState<Post[]>([])

  
  useState(() => {
    fetch("http://localhost:3005/images") 
      .then(res => res.json())
      .then(data => setImages(data))
  })

  return (
    <div className="App">
      <img className="logo" src="assets/hoxtagram-logo.png" />

    <section className="image-container">
      {images.map(title => (
        
      <article className="image-card">
        <h2 className="title">Title of image goes here</h2>
        <img src={ 
          title.image
        } className="image" />
        <div className="likes-section">
          <span className="likes">0 likes</span>
          <button className="like-button">♥</button>
        </div>
        <ul className="comments">
          <li>Get rid of these comments</li>
          <li>And replace them with the real ones</li>
          <li>From the server</li>
        </ul>
      </article>
      ))}
    </section>
    </div>
  )
}

export default App
