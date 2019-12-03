import React from 'react'
import Display from './Display'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

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
      <header className="bg-white py-3 border-b border-gray-200">
        <ReactTooltip />
        <div className="container mx-auto flex items-center">
          <div className="mr-auto">
            <Link className="flex items-center" to="/" data-tip="Maven">
              <span className="text-4xl mr-3 text-green-500"><i className="fab fa-artstation"></i></span>
            </Link>
          </div>
          <div>
            <ul className="flex">
              <Display toggle={!(sessionStorage.length)}>
                <li className="mr-5">
                  <Link className="hover:opacity-50 smooth" to="/login">
                      <span className="mr-2"><i className="fas fa-sign-in-alt"></i></span>
                      <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link className="smooth rounded text-white hover:bg-white hover:text-green-500 bg-green-500 py-3 px-5 border-solid border-2 border-green-500" to="/register">
                    <span className="mr-2"><i className="fas fa-user-plus"></i></span>
                    <span>Register</span>
                  </Link>
                </li>
              </Display>
              <Display toggle={sessionStorage.length}>
                <li className="mr-5">
                  <Link className="hover:opacity-50 smooth" to={`/profile/${user ? user.id : ''}`}>
                    <span className="mr-2"><i className="fas fa-user"></i></span>
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <button className="hover:opacity-50 smooth" onClick={this.logOut}>
                      <span className="mr-2"><i className="fas fa-sign-out-alt"></i></span>
                      <span>Log Out</span>
                  </button>
                </li>
              </Display>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
