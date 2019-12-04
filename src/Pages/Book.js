import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Moment from 'moment'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../Components/CheckoutForm'

class Book extends React.Component {
  constructor(props) {
    super(props)
    // eslint-disable-next-line
    const user = eval('(' + sessionStorage.user + ')');
    this.state = {
      date: Moment(new Date()).format("MM/DD/YYYY"),
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
    Axios.post(`https://maven-server-bos.herokuapp.com/book/new`, {
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
          <StripeProvider apiKey="pk_test_fzHvoH6sHiv0C595hdTUqt1L00AoGm1H9G">
            <div>
              <h1 className="text-center py-5">Sample Payment</h1>
              <div className="d-flex justify-content-center">
                <Elements>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
          </StripeProvider>
          <button className={buttonStyle} onClick={this.handleSubmit}>Book</button>
        </form>
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-5">
            {/* Icon from: https://www.iconfinder.com/iconsets/japan-flat-2 */}
            <img src="/icons/update-profile.png" className="mx-auto max-w-full" alt="Update Profile" />
          </div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="name" id="name" value={this.state.name} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number">
                Contact Number
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="contactNumber" id="contact_number" value={this.state.contactNumber} />
            </div>
            <div className="block text-gray-700 text-sm font-bold mb-2">Roles</div>
            <div className="flex mb-4">
              <div className="mr-5">
                <label>
                  <input
                    name="isAdmin"
                    type="checkbox"
                    checked={this.state.isAdmin}
                    onChange={this.handleChange} />
                  <span className="ml-3">Admin</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    name="isArtist"
                    type="checkbox"
                    checked={this.state.isArtist}
                    onChange={this.handleChange} />
                  <span className="ml-3">Artist</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
                Skill
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="skill" id="skill" value={this.state.skill} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile_photo">
                Profile Photo
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="profilePhoto" id="profile_photo" value={this.state.profilePhoto} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cover_photo">
                Cover Photo
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="coverPhoto" id="cover_photo" value={this.state.coverPhoto} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.handleChange} name="description" id="description" value={this.state.description} />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={this.handleSubmit}>
                Update Profile
              </button>
              <button className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" onClick={this.deleteUser}>
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Book;
