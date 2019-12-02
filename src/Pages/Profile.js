import React from 'react'
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom'

class Profile extends React.Component {
  render() {
    const buttonStyle = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
    return (
      <div className="my-5">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Link className={buttonStyle} to={`/profile/${this.props.match.params.user_id}/update`}>Update Profile</Link>
        { this.props.match.params.user_id }
      </div>
    )
  }
}

export default Profile;
