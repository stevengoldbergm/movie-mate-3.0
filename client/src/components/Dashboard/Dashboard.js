import React from 'react'
import avatar from "../../assets/imgs/placeholder_profile.jpeg"

// Add JSX to Profile

const Dashboard = () => {
  return (
    <>
      <section className="hero is-info is-small">
        <div className="hero-body">
          <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
            <div className="container is-flex is-flex-direction-column">
              <h1 id="greeting" className="title">
                Hello, welcome to your profile!
              </h1>
              <h2 className="is-size-4">Welcome to your profile!</h2>
            </div>
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src={avatar}
                alt="Profile Avatar"
              />
            </figure>
          </div>
        </div>
      </section>
      <section className="info-tiles">
        <div className="tile has-text-centered">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Review Count Coming Soon!!</p>
              <p className="subtitle">Reviews</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Movie Count Coming Soon!!</p>
              <p className="subtitle">Movies Watched</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">10</p>
              <p className="subtitle">Friends</p>
            </article>
          </div>
        </div>
      </section>
      <div className="is-6">
        <div className="card events-card">
          <header className="card-header">
            <p className="card-header-title">Your Movie Reviews</p>
          </header>
          <div className="card-table">
            <div className="content">
              <table className="table is-fullwidth is-striped">
                <tbody id="table-body"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard