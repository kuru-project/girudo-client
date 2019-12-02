import React from 'react'
import { Link } from 'react-router-dom'
import Display from './Display'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionStorage: sessionStorage
    }
  }

  render() {
    return(
      <footer className="p-3 bg-black text-white">
        <ul className="flex justify-center">
          <li className="mx-5"><Link to="/">Home</Link></li>
          <Display toggle={!(this.state.sessionStorage.length)}>
            <li className="mx-5"><Link to="/login">Login</Link></li>
            <li className="mx-5"><Link to="/register">Register</Link></li>
          </Display>
        </ul>
      </footer>
    )
  }
}

export default Footer
