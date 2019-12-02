import React from 'react'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionStorage: sessionStorage
    }
  }

  render() {
    return(
      <footer className="p-3 bg-black text-white text-center">
        Maven &copy; {(new Date()).getFullYear()}
      </footer>
    )
  }
}

export default Footer
