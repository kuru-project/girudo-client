import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import { Link } from 'react-router-dom'

class Homepage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    Axios.get('https://maven-server-bos.herokuapp.com/artist')
      .then((response) => {
        this.setState({
          artists: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="my-5 container mx-auto">
        <Helmet>
          <title>Homepage</title>
        </Helmet>
        <h1 className="text-3xl mb-5">Artists</h1>
        <ul>
          {this.state.artists.map((artist, index) => {
            return (
              <li key={index}>
                {index+1}. <Link className="hover:underline" to={`/profile/${artist._id}`}>{ artist.name }</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Homepage;
