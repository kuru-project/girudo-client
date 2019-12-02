import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    console.log("Email:", this.state.email)
    console.log("Password:", this.state.password)
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
