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
      <header className="bg-red-700 py-5 text-white">
        <div className="container mx-auto flex">
          <div className="mr-auto">this is the logo</div>
          <div>
            This is the header
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
