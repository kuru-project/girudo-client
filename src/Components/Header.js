import React from 'react'
import Display from './Display'

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
      <header>
        This is the header
        <Display toggle={this.state.sessionStorage.length}>
          <button onClick={this.logOut}>
            Log Out
          </button>
        </Display>
      </header>
    )
  }
}

export default Header
