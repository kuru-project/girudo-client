import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Moment from 'moment'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from '../Components/CheckoutForm'

class Book extends React.Component {
  constructor(props) {
    super(props)
    // eslint-disable-next-line
    const user = eval('(' + sessionStorage.user + ')');
    this.state = {
      port: process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
      date: Moment(new Date()).format("MM/DD/YYYY"),
      contactNumber: user.contactNumber,
      artistId: this.props.match.params.user_id,
      bookerId: user.id,
      location: ''
    }
    this.handleChange   = this.handleChange.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
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

  render() {
    return (
      <div className="my-5">
        <Helmet>
          <title>Book | Maven</title>
        </Helmet>
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-5">
            {/* Icon from: https://www.iconfinder.com/iconsets/japan-flat-2 */}
            <img src="/icons/book.png" className="mx-auto max-w-full" alt="Update Profile" />
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex justify-center">
              <DayPicker
                onDayClick={this.handleDayClick}
                showOutsideDays
                disableDays={[new Date(), { daysOfWeek: [0,6] }, new Date(2019, 11, 26)]}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="location" id="location" value={this.state.location} />
            </div>
            <div>
              <StripeProvider apiKey="pk_test_fzHvoH6sHiv0C595hdTUqt1L00AoGm1H9G">
                <div>
                  <h1 className="text-center py-5">Sample Payment</h1>
                  <div className="d-flex justify-content-center">
                    <Elements>
                      <CheckoutForm date={ this.state.date } contactNumber={ this.state.contactNumber } artistId={ this.state.artistId } bookerId={ this.state.bookerId } location={ this.state.location } />
                    </Elements>
                  </div>
                </div>
              </StripeProvider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Book;
