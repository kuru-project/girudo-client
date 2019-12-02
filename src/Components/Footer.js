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
      <footer className="p-3 bg-black text-white text-center">
        Maven &copy; {(new Date()).getFullYear()}
      </footer>
    )
  }
}

export default Footer
