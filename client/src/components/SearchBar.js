import React from "react";

function SearchBar() {
  return (
    <>
      <header className="columns">
        <section className="column is-one-fifth is-hidden-mobile" />
        <section className="column is-three-fifths is-12-mobile">
          <form id="srch-form">
            <p className="control center">
              <input
                className="input"
                id="srch-title"
                type="text"
                placeholder="Movie Title"
                autoComplete="off"
              />
            </p>
            <br />
            <h2 className="subtitle has-text-white">
              Search for movies - Get the details!
            </h2>
            <br />
            {/* Search Button */}
            <section>
              <button className="button is-info is-light has-text-black">
                Search Movies
              </button>
              {/* Dropdown Start */}
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <div
                    className="has-background-info-light has-text-black is-normal p-2 ml-1 is-size-6 is-roundeds"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu3"
                    disabled="true"
                  >
                    <span>Search History</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    <hr className="dropdown-divider" />
                    {/* Make the clear history button here */}
                    <button
                      onclick="clearLocalStorage()"
                      className="dropdown-item"
                    >
                      Clear History
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </section>
        <section className="column is-one-fifth is-hidden-mobile" />
      </header>
    </>
  );
}

export default SearchBar;
