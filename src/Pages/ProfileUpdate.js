import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import { createSnackbar } from '@snackbar/core'
import '@snackbar/core/dist/snackbar.css'

class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      contactNumber: '',
      skill: '',
      isAdmin: false,
      isArtist: false,
      coverPhoto: '',
      profilePhoto: '',
      description: ''
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
      createSnackbar('Something went wrong!', {
        position: 'right',
        timeout: 2000
      })
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
      'isArtist': this.state.isArtist,
      'coverPhoto': this.state.coverPhoto,
      'profilePhoto': this.state.profilePhoto,
      'description': this.state.description
    }, {
      headers: {
        'x-auth-token': sessionStorage.token
      }
    }).then(function(response) {
      // eslint-disable-next-line
      const user = eval('(' + sessionStorage.user + ')');
      window.location.replace('/#/profile/' + user.id);
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
          isArtist: response.data.isArtist,
          coverPhoto: response.data.coverPhoto,
          profilePhoto: response.data.profilePhoto,
          description: response.data.description
        })
      })
      .catch((error) => {
        createSnackbar('Something went wrong!', {
          position: 'right',
          timeout: 2000
        })
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
            <img src="/icons/update-profile.png" className="mx-auto max-w-full" alt="Update Profile" />
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <div className="block text-gray-700 text-sm font-bold mb-2">Roles</div>
            <div className="flex mb-4">
              <div className="mr-5">
                <label>
                  <input
                    name="isAdmin"
                    type="checkbox"
                    checked={this.state.isAdmin}
                    onChange={this.handleChange} />
                  <span className="ml-3">Admin</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    name="isArtist"
                    type="checkbox"
                    checked={this.state.isArtist}
                    onChange={this.handleChange} />
                  <span className="ml-3">Artist</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
                Skill
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="skill" id="skill" value={this.state.skill} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_photo">
                Profile Photo
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="profilePhoto" id="profile_photo" value={this.state.profilePhoto} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cover_photo">
                Cover Photo
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="coverPhoto" id="cover_photo" value={this.state.coverPhoto} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="description" id="description" value={this.state.description} />
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
