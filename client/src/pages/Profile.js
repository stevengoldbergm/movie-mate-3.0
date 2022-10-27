import React from 'react'

// Add JSX to Profile

function Profile() {
  return (
    <div>
    <div className="columns p-4 has-background-white">
  <div className="is-3 p-3 ">
    <aside className="menu is-hidden-mobile ">
      <p className="menu-label">
        Profile
      </p>
      <ul className="menu-list">
        <li><a>Your Reviews</a></li>
        <li><a>Your Activity</a></li>
        <li><a>Settings</a></li>
      </ul>
    </aside>
  </div>
  <div className="column is-9">
    <section className="hero is-info is-small">
      <div className="hero-body">
        <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
          <div className="container is-flex is-flex-direction-column">
            <h1 id="greeting" className="title">
              Hello, welcome to your profile!
            </h1>
            <h2 className="is-size-4">
              Welcome to your profile!
            </h2>
          </div>
          <figure className="image is-128x128">
            <img className="is-rounded" src="/imgs/placeholder_profile.jpeg" />
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
          <p className="card-header-title">
            Your Movie Reviews
          </p>
        </header>
        <div className="card-table">
          <div className="content">
            <table className="table is-fullwidth is-striped">
              <tbody id="table-body">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Profile