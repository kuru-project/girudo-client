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
    const user = eval('(' + sessionStorage.user + ')');
    return(
      <header className="bg-red-700 py-5 text-white">
        <div className="container mx-auto flex">
          <div className="mr-auto">
            <Link className="hover:underline" to="/"><h1>Maven</h1></Link>
          </div>
          <div>
            <ul className="flex">
              <Display toggle={!(this.state.sessionStorage.length)}>
                  <li className="mr-3"><Link className="hover:underline" to="/login">Login</Link></li>
                  <li><Link className="hover:underline" to="/register">Register</Link></li>
              </Display>
              <Display toggle={this.state.sessionStorage.length}>
                <li className="mr-3"><button className="hover:underline" onClick={this.logOut}>Log Out</button></li>
                <li><Link className="hover:underline" to={`/profile/${user.id}`}>Profile</Link></li>
              </Display>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
