import React from 'react'

function SignUp() {
  return (
    <div>
        <div className="hero is-info">
  <div className="hero-body">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-4">
          <form className="box" id="submit">
            <h1 className="py-2">Sign Up Here:</h1>
            <div className="field">
              <label className="label">
                Email
              </label>
              <div className="control has-icons-left">
                <input type="email" className="input" id="email-signup" placeholder="e.g movie@example.com" />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">
                Username
              </label>
              <div className="control has-icons-left">
                <input type="username" className="input" id="username-signup" placeholder="Must be 8-10 characters" />
                <span className="icon is-small is-left">
                  <i className=" fa fa-regular fa-user" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">
                Password
              </label>
              <div className="control has-icons-left">
                <input type="password" className="input" id="password-signup" placeholder="Enter Password Here" />
                <span className="icon is-small is-left">
                  <i className="fa fa-regular fa-key" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control has-icons-left">
                <input type="password" id="retypepassword-signup" className="input" placeholder="Re-type Password Here" />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock" />
                </span>
              </div>
            </div>
            <div className="field">
              {/* <label className="label">
                <input type="checkbox" className="checkbox" />
                Remember me
              </label> */}
            </div>
            <div className="field">
              <button className="button is-info is-fullwidth">Create Account</button>
            </div>
            <div className="has-text-centered">
              <p className="is-size-7"> Already have an account? <a href="/login" className="has-text-info">Login!</a>
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

export default SignUp