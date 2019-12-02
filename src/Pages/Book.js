import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Moment from 'moment'

class Book extends React.Component {
  constructor(props) {
    super(props)
    // eslint-disable-next-line
    const user = eval('(' + sessionStorage.user + ')');
    this.state = {
      date: Moment(new Date).format("MM/DD/YYYY"),
      contactNumber: user.contactNumber,
      artistId: this.props.match.params.user_id,
      bookerId: user.id,
      location: ''
    }
    this.handleChange   = this.handleChange.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleSubmit   = this.handleSubmit.bind(this)
  }

  handleDayClick(day) {
    this.setState({
      date: day
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    Axios.post(`http://localhost:4000/book/new`, {
      'date': this.state.date,
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
          <div>
            <DayPicker
              onDayClick={this.handleDayClick}
              showOutsideDays
              disableDays={[new Date(), { daysOfWeek: [0,6] }, new Date(2019, 11, 26)]}
            />
          </div>
          <input className={inputFieldStyle} onChange={this.handleChange} name="location" placeholder="Location" />
          <button className={buttonStyle} onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Book;
