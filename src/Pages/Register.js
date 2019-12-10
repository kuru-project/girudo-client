import React from 'react'
import Axios from 'axios'
import { Helmet } from 'react-helmet'
import { createSnackbar } from '@snackbar/core'
import '@snackbar/core/dist/snackbar.css'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      port: process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
      name: '',
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
    Axios.post(`${ this.state.port }/user/new`, {
      'name': this.state.name,
      'email': this.state.email,
      'password': this.state.password
    }).then(function(response) {
      window.location.replace("/");
    }).catch(function(error) {
      createSnackbar('Something went wrong!', {
        position: 'right',
        timeout: 2000
      })
    })
    event.preventDefault()
  }

  render() {
    return(
      <div className="container mx-auto py-5 my-auto">
        <Helmet>
          <title>Register | Maven</title>
        </Helmet>
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-5">
            {/* Icon from: https://www.iconfinder.com/iconsets/japan-flat-2 */}
            <img src="/icons/register.png" className="mx-auto max-w-full" alt="Register" />
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="name" id="name" placeholder="Full Name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="email" type="email" id="email" placeholder="Email" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="password" id="password" type="password" placeholder="Password" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={this.handleSubmit}>
                Register
              </button>
              <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/login">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Register
