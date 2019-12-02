import React from 'react'
import Axios from 'axios'
import { Helmet } from 'react-helmet'

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
    Axios.post('http://localhost:4000/login', {
      'email': this.state.email,
      'password': this.state.password
    }).then(function(response) {
      sessionStorage.token = response.data.token;
      sessionStorage.user = response.data.user;
      window.location.replace("/");
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }

  render() {
    return(
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="my-5">
          Login Email: admin@account.com<br />
          Login Password: 12345678
        </div>
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
