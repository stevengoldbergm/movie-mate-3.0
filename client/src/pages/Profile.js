import React, { useState } from 'react'
import Dashboard from '../components/Dashboard/Dashboard';
import Friends from './Friends'
import WatchParties from './WatchParties'
import UserReviews from './UserReviews';

// Add JSX to Profile

const Profile = () => {
  // useState to set the correct dashboard component
  const [currentPage, setCurrentPage] = useState('MyActivity')
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const renderComponent = () => {
    if (currentPage === 'MyActivity') {
      return <Dashboard />
    } else if (currentPage === 'Friends') {
      return <Friends />
    } else if (currentPage === 'MyReviews') {
      return <UserReviews />
    } else {
      return <WatchParties />
    }
  }


  return (
    <>
      <div className="columns p-4 has-background-white is-justify-content-space-around is-flex-direction-column-mobile">
        <div className="is-3 p-3 is-hidden-mobile">
          <aside className="menu">
            {/* <p className="menu-label">Profile</p> */}
            <ul className="menu-list">
              {/* eslint-disable */}
              <li>
                <a onClick={() => handlePageChange('MyActivity')}>My Activity</a>
              </li>
              <li>
                <a onClick={() => handlePageChange('MyReviews')}>My Reviews</a>
              </li>
              <li>
                <a onClick={() => handlePageChange("Friends")}>Friends</a>
              </li>
              <li>
                <a onClick={() => handlePageChange("WatchParties")}>Watch Parties</a>
              </li>
              {/* eslint-enable */}
            </ul>
          </aside>
        </div>
        {/* Use a navbar in mobile view */}
        <div className="is-3 p-3 is-hidden-tablet">
          <nav className="has-background-white" role="navigation" aria-label="main navigation">
          <div id="mobile-navbar" className="container menu-list is-flex is-justify-content-space-around">
            {/* eslint-disable */}
            <a className=' has-text-black' onClick={() => handlePageChange("Friends")}>Friends</a>
            <a className=' has-text-black' onClick={() => handlePageChange('MyActivity')}>Activity</a>
            <a className=' has-text-black' onClick={() => handlePageChange('MyReviews')}>My Reviews</a>
            <a className=' has-text-black' onClick={() => handlePageChange("WatchParties")}>Parties</a>
            {/* eslint-enable */}
          </div>
          </nav>
        </div>
        <div className="column is-9">
          {renderComponent()}
          {/* <section className="hero is-info is-small">
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
                    src="/imgs/placeholder_profile.jpeg"
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Profile