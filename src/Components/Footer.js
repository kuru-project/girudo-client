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
      <footer className="p-3 mx-auto container border-t border-gray-300 text-gray-500 flex">
        <div className="flex-1">Made in a hurry — Maven &copy; {(new Date()).getFullYear()}</div>
        <ul className="flex">
          <li className="mr-3">
            <a href="#link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-square"></i>
            </a>
          </li>
          <li className="mr-3">
            <a href="#link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
          </li>
        </ul>
      </footer>
    )
  }
}

export default Footer
