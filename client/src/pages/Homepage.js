import React from 'react'

function Homepage() {
  return (
<div>
<main className="is-fullheight has-background-white">
    <div id="search-results" className="is-6 p-4 is-hidden">
      <div className="card events-card">
        <header className="card-header ">
          <p className="card-header-title">
            Search Results
          </p>
        </header>
        <div className="card-table">
          <table className="table is-fullwidth is-striped">
            <tbody id="table-body">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</div>

  )
}

export default Homepage