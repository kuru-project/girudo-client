import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import { createSnackbar } from '@snackbar/core'
import '@snackbar/core/dist/snackbar.css'
import { Link } from 'react-router-dom'

class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      contactNumber: '',
      skill: '',
      isAdmin: false,
      isArtist: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  deleteUser(event) {
    Axios.delete(`https://maven-server-bos.herokuapp.com/user/${this.props.match.params.user_id}/destroy`, {
      headers: {
        'x-auth-token': sessionStorage.token
      }
    }).then(function(response) {
      sessionStorage.clear()
      window.location.replace("/")
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }

  handleChange(event) {
    if(event.target.type === 'checkbox') {
      this.setState({
        [event.target.name]: event.target.checked
      })
    }else{
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit(event) {
    console.log(this.state)
    Axios.patch(`https://maven-server-bos.herokuapp.com/user/${this.props.match.params.user_id}/update`, {
      'name': this.state.name,
      'contactNumber': this.state.contactNumber,
      'skill': this.state.skill,
      'isAdmin': this.state.isAdmin,
      'isArtist': this.state.isArtist
    }, {
      headers: {
        'x-auth-token': sessionStorage.token
      }
    }).then(function(response) {
      window.location.replace('/');
    }).catch(function(error) {
      createSnackbar('Something went wrong!', {
        position: 'right',
        timeout: 2000
      })

    })
    event.preventDefault()
  }

  componentDidMount() {
    // eslint-disable-next-line
    const user = eval('(' + sessionStorage.user + ')');
    Axios.get(`https://maven-server-bos.herokuapp.com/user/${this.props.match.params.user_id}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          contactNumber: response.data.contactNumber,
          skill: response.data.skill,
          isAdmin: response.data.isAdmin,
          isArtist: response.data.isArtist
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container mx-auto py-5 my-auto">
        <Helmet>
          <title>Update Profile</title>
        </Helmet>
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-5">
            {/* Icon from: https://www.iconfinder.com/iconsets/japan-flat-2 */}
            <img src="/icons/login.png" className="mx-auto max-w-full" alt="Log In" />
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <label>
                Is admin:
                <input
                  name="isAdmin"
                  type="checkbox"
                  checked={this.state.isAdmin}
                  onChange={this.handleChange} />
              </label>
            </div>
            <div>
              <label>
                Is artist:
                <input
                  name="isArtist"
                  type="checkbox"
                  checked={this.state.isArtist}
                  onChange={this.handleChange} />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="name" id="name" value={this.state.name} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number">
                Contact Number
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="contactNumber" id="contact_number" value={this.state.contactNumber} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
                Skill
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="skill" id="skill" value={this.state.skill} />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={this.handleSubmit}>
                Update Profile
              </button>
              <button className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" onClick={this.deleteUser}>
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ProfileUpdate;
