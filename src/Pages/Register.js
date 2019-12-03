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
    Axios.post('https://maven-server-bos.herokuapp.com/user/new', {
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
    const inputFieldStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
    const buttonStyle     = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    return(
      <div className="my-5">
        <Helmet>
          <title>Register</title>
        </Helmet>
        <form>
          <input className={inputFieldStyle} onChange={this.handleChange} name="name" placeholder="Name" />
          <input className={inputFieldStyle} onChange={this.handleChange} name="email" type="email" placeholder="Email" />
          <input className={inputFieldStyle} onChange={this.handleChange} name="password" type="password" placeholder="Password" current-password="true" autoComplete="off" />
          <button className={buttonStyle} onClick={this.handleSubmit}>Submit</button>
        </form>
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-5">
            {/* Icon from: https://www.iconfinder.com/iconsets/japan-flat-2 */}
            <img src="/icons/login.png" className="mx-auto max-w-full" alt="Log In" />
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} type="email" id="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} type="email" id="email" placeholder="Email" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} id="password" type="password" placeholder="Password" name="password" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={this.handleSubmit}>
                Login
              </button>
              <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/register">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Register
