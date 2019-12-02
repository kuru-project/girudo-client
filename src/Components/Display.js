import React from 'react'

class Display extends React.Component {
  render() {
    return(
      <>{ this.props.toggle ? this.props.children : null }</>
    )
  }
}

export default Display
