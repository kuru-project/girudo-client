import React from 'react'
import Display from './Display'

class Header extends React.Component {
  render() {
    return(
      <header>
        This is the header
        <Display toggle={false}>
          hello
        </Display>
        <button onClick={this.logOut}>
          sessionStorage.clear();
        </button>
      </header>
    )
  }
}

export default Header
