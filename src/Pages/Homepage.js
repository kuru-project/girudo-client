import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'

class Homepage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      artists: []
    }
  }
  componentDidMount() {
    Axios.get('http://localhost:4000/artist')
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
      <div className="my-5">
        <Helmet>
          <title>Homepage</title>
        </Helmet>
        {this.state.artists.map((artist, index) => {
          return (<div key={index}>{ artist.name }</div>)
        })}
      </div>
    )
  }
}

export default Homepage;
