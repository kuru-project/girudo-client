import React from 'react';

class Login extends React.Component {
  handleChange(event) {
    console.log("Input is being updated")
  }
  handleSubmit(event) {
    console.log("You submitted the data!")
    event.preventDefault()
  }
  render() {
    return(
      <div>
        <input onChange={this.handleChange} name="email" type="email" />
        <input onChange={this.handleChange} name="password" type="password" />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default Login;
