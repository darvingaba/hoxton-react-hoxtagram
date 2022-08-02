export function Article({image, onLike, addComment, comments}) {
    return (
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
            action="#"
          >
            <input
              className="inputPlaceholder"
              type="text"
              placeholder="Add a comment"
            />
            <button className="comment-button">Add Comment</button>
          </form>
        </div>

        <ul className="comments">
          {comments.map((comment) => (
            <li className="comment">{comment.content}</li>
          ))}
        </ul>
      </article>
    );
}