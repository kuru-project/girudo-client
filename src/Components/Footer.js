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
      <footer>
        <Link to="/">Home</Link> |
        <Display toggle={!(this.state.sessionStorage.length)}>
          <Link to="/login">Login</Link> |
          <Link to="/register">Register</Link>
        </Display>
      </footer>
    )
  }
}

export default Footer
