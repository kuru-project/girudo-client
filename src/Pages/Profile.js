import React from 'react'
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom'

class Profile extends React.Component {
  render() {
    const buttonStyle = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
    const buttonDangerStyle = "block w-full text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
    return (
      <div className="my-5">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <ul className="flex">
          <li className="mx-3 flex-1"><Link className={buttonStyle} to={`/profile/${this.props.match.params.user_id}/update`}>Update Profile</Link></li>
          <li className="mx-3 flex-1"><Link className={buttonDangerStyle} to={`/profile/${this.props.match.params.user_id}/destroy`}>Delete Profile</Link></li>
        </ul>
        { this.props.match.params.user_id }
      </div>
    )
  }
}

export default Profile;
