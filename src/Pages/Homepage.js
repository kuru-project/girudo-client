import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import { Link } from 'react-router-dom'

class Homepage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      artists: [],
      users: [],
      port: process.env.REACT_APP_SERVER_URL || "http://localhost:4000"
    }
  }

  componentDidMount() {
    Axios.get(`${ this.state.port }/artist`)
      .then((response) => {
        this.setState({
          artists: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
    Axios.get(`${ this.state.port }/user`)
      .then((response) => {
        this.setState({
          users: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="my-5 container mx-auto flex-1">
        <Helmet>
          <title>Maven - Book an artist whenever you want!</title>
        </Helmet>
        <div className="mb-5">
          <h1 className="text-3xl mb-5">Artists</h1>
          <ul>
            {this.state.artists.map((artist, index) => {
              return (
                <li key={index} className="inline-block">
                  <Link className="hover:underline" to={`/profile/${artist._id}`}>
                    <img src={ artist.profilePhoto } alt={ artist.name } className="w-20 h-20 mr-3 rounded-full hover:opacity-50 smooth" title={ artist.name } />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mb-5">
          <h1 className="text-3xl mb-5">Users</h1>
          <ul>
            {this.state.users.map((user, index) => {
              return (
                <li key={index} className="inline-block">
                  <Link className="hover:underline" to={`/profile/${user._id}`}>
                    <img src={ user.profilePhoto } alt={ user.name } className="w-20 h-20 mr-3 rounded-full hover:opacity-50 smooth" title={ user.name } />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Homepage;
