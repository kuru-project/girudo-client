import React from 'react'
import Axios from 'axios'

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
    Axios.post('localhost:4000/login', {
      'email': this.state.email,
      'password': this.state.password
    }).then(function(response) {
      console.log(response)
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }

  render() {
    return(
      <div>
        <form>
          <input onChange={this.handleChange} name="email" type="email" placeholder="Email" />
          <input onChange={this.handleChange} name="password" type="password" placeholder="Password" current-password="true" autoComplete="off" />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;
