import React from 'react'

function Review() {
  return (
    <div>
       <div className="hero has-background-white">
  <div className="hero-body">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-9">
          <section className="hero is-info welcome is-small">
            <div className="hero-body">
              <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                <div className="is-flex is-flex-direction-column">
                  <h1 className="title movie-title" />
                  <p className="movie-actors" />
                  <p className="movie-director" />
                  <p className="movie-writer" />
                  <p className="movie-rated" />
                  <p className="movie-released" />
                  <p className="movie-genre" />
                </div>
                <figure className="image">
                  <img className="movie-poster" src />
                </figure>
              </div>
            </div>
          </section>
          <br />
          <section>
            <div className="card-master is-6">
              <form className="box" id="submit-review">
                <h1 className="py-2">Add a Review:</h1>
                <div className="field">
                  <label className="label">
                    Score (1-10):
                  </label>
                  <div className="control">
                    <div className="select">
                      <select id="review-score">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">
                    Review:
                  </label>
                  <textarea className="textarea is-info" id="review-text" placeholder="What did you think about the movie?" defaultValue={""} />
                </div>
                <div className="field">
                  <button className="button is-info is-fullwidth">Add Review</button>
                </div>
                <div className="has-text-centered">
                  <br />
                  <a href="/login" className="has-text-info">
                    <button className="button is-info is-fullwidth">Log in!</button>
                  </a>
                  <p className="is-size-7 pt-2"> 
                    You must me logged in to post a review. 
                  </p>
                </div>
                <br />
              </form>
            </div>
            </section>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Review