import React from 'react'
import Display from './Display'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionStorage: sessionStorage
    }
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    sessionStorage.clear()
    window.location.replace("/");
  }

  render() {
    return(
      <header className="bg-red-700 py-5 text-white">
        <div className="container mx-auto flex">
          <div className="mr-auto">
            <Link className="hover:underline" to="/"><h1>Maven</h1></Link>
          </div>
          <div>
            <Display toggle={!(this.state.sessionStorage.length)}>
              <ul className="flex">
                <li className="mr-3"><Link className="hover:underline" to="/login">Login</Link></li>
                <li><Link className="hover:underline" to="/register">Register</Link></li>
              </ul>
            </Display>
            <Display toggle={this.state.sessionStorage.length}>
              <button onClick={this.logOut}>
                Log Out
              </button>
            </Display>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
