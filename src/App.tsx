import { useEffect, useState } from 'react'
import './App.css'

type Post = {
  comments: any
  id: number
  title: string
  likes: number
  image: string
}
type Comment = {
  id: number
  content: string
  imageId: number
}

function App() {
  const [images, setImages] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  console.log(comments)
  
  useEffect(() => {
    fetch("http://localhost:3005/images") 
      .then(res => res.json())
      .then(data => setImages(data))
  } , [])

  useEffect(() => {
    fetch("http://localhost:3005/comments") 
      .then(res => res.json())
      .then(data => setComments(data))
  } , [])

  function onLike(id: number) {
    const newImages = [...images]
    const index = newImages.findIndex(image => image.id === id)
    newImages[index].likes += 1
    
    fetch(`http://localhost:3005/images/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: newImages[index].likes })
    })
    setImages(newImages);
  }
  
  // the server gets updated with the new comment but doesn't return the new comment
  function addComment( comment: string) {
    let newComments={
      text: comment,
    }

    fetch("http://localhost:3005/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(newComments)
    })
    .then(res => res.json())
    .then(data => setComments([...comments, data]))
  }


  



  return (
    <div className="App">
      <img className="logo" src="assets/hoxtagram-logo.png" />

      <section className="image-container">
        {images.map((image) => (
          <article className="image-card">
            <h2 className="title">{image.title}</h2>
            <img src={image.image} className="image" />
            <div className="likes-section">
              <span className="likes">Likes {image.likes}</span>
              <button onClick={() => onLike(image.id)} className="like-button">
                ♥
              </button>
            </div>

            <div className="comments-section">
              <form
              // adds comment to the database but has no value comment.content = ""
              // fix this
                onSubmit={(event) => {
                  event.preventDefault();
                  addComment((event.target as HTMLInputElement).value);
                  (event.target as HTMLInputElement).value = "";
                }}
              action="#">
                <input
                className='inputPlaceholder' type="text" placeholder="Add a comment" />
                <button
                className="comment-button">
                  Add Comment
                </button>

              </form>
            </div>

            <ul className="comments">
              {comments.map((comment) => (
                <li className="comment">{comment.content}</li>
              ))}

            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App
