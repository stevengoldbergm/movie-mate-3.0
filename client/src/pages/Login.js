import React from 'react'

function Login() {
  return (
    <div>
        <div className="hero is-info">
  <div className="hero-body">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-4">
          <form className="box" id="submit">
            <h1 className="py-2">Login Here:</h1>
            <div className="field">
              <label className="label">
                Email
              </label>
              <div className="control has-icons-left">
                <input type="email" id="email" className="input" placeholder="e.g movie@example.com" />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input type="password" className="input" id="password" placeholder="Enter Password Here" />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock" />
                </span>
              </div>
            </div>
            <div className="field">
            </div>
            <div className="field">
              <button className="button is-info is-fullwidth">Login</button>
            </div>
            <div className="has-text-centered">
              <p className="is-size-7"> Don't have an account? <a href="/sign-up" className="has-text-info">Sign Up Here!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Login