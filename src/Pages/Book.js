import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'

class Book extends React.Component {
  constructor(props) {
    super(props)
    const user = eval('(' + sessionStorage.user + ')');
    this.state = {
      timestamp: 1,
      contactNumber: user.contactNumber,
      artistId: this.props.match.params.user_id,
      bookerId: user.id,
      location: ''
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
    Axios.post(`http://localhost:4000/book/new`, {
      'timestamp': this.state.timestamp,
      'contactNumber': this.state.contactNumber,
      'artistId': this.state.artistId,
      'bookerId': this.state.bookerId,
      'location': this.state.location,
    }, {
      headers: {
        'x-auth-token': sessionStorage.token
      }
    }).then(function(response) {
      window.location.replace('/');
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }

  render() {
    const inputFieldStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
    const buttonStyle     = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    // eslint-disable-next-line
    return (
      <div className="my-5">
        <Helmet>
          <title>Book</title>
        </Helmet>
        <form>
          <input className={inputFieldStyle} onChange={this.handleChange} name="timestamp" placeholder="Timestamp" />
          <input className={inputFieldStyle} onChange={this.handleChange} name="contactNumber" value={this.state.contactNumber} />
          <input className={inputFieldStyle} onChange={this.handleChange} name="artistId" value={this.state.artistId} />
          <input className={inputFieldStyle} onChange={this.handleChange} name="bookerId" value={this.state.bookerId} />
          <input className={inputFieldStyle} onChange={this.handleChange} name="location" placeholder="Location" />
          <button className={buttonStyle} onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Book;
