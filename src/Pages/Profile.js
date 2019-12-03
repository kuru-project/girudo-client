import React from 'react'
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom'
import Axios from 'axios'

class Profile extends React.Component {
  constructor(props) {
    super(props)

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
  book(event) {
    console.log("booked")
    event.preventDefault()
  }
  render() {
    const buttonStyle = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
    const buttonBookStyle = "block w-full text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
    const buttonDangerStyle = "block w-full text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
    return (
      <div className="my-5">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <ul className="flex">
          <li className="mx-3 flex-1"><Link className={buttonStyle} to={`/profile/${this.props.match.params.user_id}/update`}>Update Profile</Link></li>
          <li className="mx-3 flex-1"><Link className={buttonBookStyle} to={`/book/${this.props.match.params.user_id}`}>Book</Link></li>
          <li className="mx-3 flex-1"><button className={buttonDangerStyle} onClick={this.deleteUser}>Delete Profile</button></li>
        </ul>
        { this.props.match.params.user_id }
      </div>
    )
  }
}

export default Profile;
