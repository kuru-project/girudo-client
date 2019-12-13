import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Display from '../Components/Display'

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
      <div className="bg-cover flex-1" style={ sessionStorage.length ? {} : { backgroundImage: "url('https://i.imgur.com/Y67tg2p.png')" } }>
        <div className="my-5 container mx-auto">
          <Helmet>
            <title>Maven - Book an artist whenever you want!</title>
          </Helmet>
          <Display toggle={!(sessionStorage.length)}>
            <div className="font-bebas-neue text-center my-32 xl:my-64">
              <h2 className="text-6xl">Welcome to Maven!</h2>
              <h3 className="text-gray-500 text-3xl">Book an artist whenever you want!</h3>
            </div>
          </Display>
          <Display toggle={sessionStorage.length}>
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
          </Display>
        </div>
      </div>
    )
  }
}

export default Homepage;
