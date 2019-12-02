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
      sessionStorage.user = JSON.stringify(response.data.user);
      window.location.replace("/");
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }

  render() {
    const inputFieldStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
    const buttonStyle     = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    const textStyle       = "block text-gray-700 text-sm font-bold mb-2"
    return(
      <div className="my-5">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="mb-5">
          <div className={textStyle}>Login Email: admin@account.com</div>
          <div className={textStyle}>Login Password: 12345678</div>
        </div>
        <form>
          <input className={inputFieldStyle} onChange={this.handleChange} name="email" type="email" placeholder="Email" />
          <input className={inputFieldStyle} onChange={this.handleChange} name="password" type="password" placeholder="Password" current-password="true" autoComplete="off" />
          <button className={buttonStyle} onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;
