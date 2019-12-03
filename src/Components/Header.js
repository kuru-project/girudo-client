import React from 'react'
import Display from './Display'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    sessionStorage.clear()
    window.location.replace("/");
  }

  render() {
    // eslint-disable-next-line
    const user = eval('(' + sessionStorage.user + ')');
    return(
      <header className="bg-white py-3 text-black border-b border-gray-200">
        <div className="container mx-auto flex items-center">
          <div className="mr-auto">
            <Link className="hover:underline" to="/">
              <span className="text-3xl"><i className="fab fa-medium"></i></span>
            </Link>
          </div>
          <div>
            <ul className="flex">
              <Display toggle={!(sessionStorage.length)}>
                  <li className="mr-3"><Link className="hover:underline" to="/login">Login</Link></li>
                  <li><Link className="hover:underline" to="/register">Register</Link></li>
              </Display>
              <Display toggle={sessionStorage.length}>
                <li className="mr-3"><button className="hover:underline" onClick={this.logOut}>Log Out</button></li>
                <li className="mr-3"><Link className="hover:underline" to={`/profile/${user ? user.id : ''}`}>Profile</Link></li>
                <li><Link className="hover:underline" to={`/`}>Bookings</Link></li>
              </Display>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
