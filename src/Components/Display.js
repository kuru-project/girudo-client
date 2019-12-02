import React from 'react'

class Display extends React.Component {
  render() {
    return(
      <>
        {
          this.props.toggle ? <div>{this.props.children}</div> : null
        }
      </>
    )
  }
}

export default Display
