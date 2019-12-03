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
      <footer className="p-3 text-center border-gray-200 border-t bg-white">
        Maven &copy; {(new Date()).getFullYear()}
      </footer>
    )
  }
}

export default Footer
