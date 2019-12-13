import React from 'react'
import { Helmet } from "react-helmet"
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { createSnackbar } from '@snackbar/core'
import '@snackbar/core/dist/snackbar.css'
import Display from '../Components/Display'
import Moment from 'moment'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      port: process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
      // eslint-disable-next-line
      currentUser: sessionStorage.length ? eval('(' + sessionStorage.user + ')') : false,
      id: '',
      name: '',
      contactNumber: '',
      skill: '',
      isAdmin: false,
      isArtist: false,
      coverPhoto: '',
      profilePhoto: '',
      description: '',
      book: []
    }

    this.deleteUser = this.deleteUser.bind(this)
  }

  deleteUser(event) {
    Axios.delete(`${ this.state.port }/user/${this.props.match.params.user_id}/destroy`, {
      headers: {
        'x-auth-token': sessionStorage.token
      }
    }).then(function(response) {
      sessionStorage.clear()
      window.location.replace("/")
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }

  book(event) {
    console.log("booked")
    event.preventDefault()
  }

  componentDidMount() {
    Axios.get(`${ this.state.port }/user/${this.props.match.params.user_id}`)
      .then((response) => {
        this.setState({
          id: response.data._id,
          name: response.data.name,
          contactNumber: response.data.contactNumber,
          skill: response.data.skill,
          isAdmin: response.data.isAdmin,
          isArtist: response.data.isArtist,
          coverPhoto: response.data.coverPhoto,
          profilePhoto: response.data.profilePhoto,
          description: response.data.description
        })
        Axios.get(`${ this.state.port }/book/${ response.data._id }/list`)
          .then((response) => {
            this.setState({
              book: response.data
            })
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        createSnackbar('Something went wrong!', {
          position: 'right',
          timeout: 2000
        })
      })
  }

  render() {
    const buttonStyle = "text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 text-sm rounded focus:outline-none focus:shadow-outline"
    const buttonBookStyle = "text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 text-sm rounded focus:outline-none focus:shadow-outline"
    return (
      <div className="flex-1">
        <Helmet>
          <title>{ this.state.name } | Maven</title>
        </Helmet>
        <div className="bg-cover bg-gray-300 mb-10 h-32 md:h-48 lg:h-64 bg-center" style={{ backgroundImage: `url(${this.state.coverPhoto})` }}></div>
        <div className="flex items-center mb-5 container mx-auto border-b pb-5">
          <div className="mr-5 max-w-full w-64">
            <img src={ this.state.profilePhoto } className="rounded-full w-32 h-32 m-auto" alt={ this.state.name } />
          </div>
          <div className="flex-1 ml-5">
            <div className="w-64 overflow-hidden max-w-full">
              <h1 className="font-bold text-3xl">{ this.state.name }</h1>
              <Display toggle={sessionStorage.length}>
                <ul className="flex mb-5 mt-2">
                    <Display toggle={this.state.currentUser && this.state.isArtist && !(this.state.currentUser.id === this.state.id)}>
                      <li className="flex-1">
                        <Link className={buttonBookStyle} to={`/book/${this.props.match.params.user_id}`}>
                          <span className="mr-2"><i className="fas fa-book"></i></span>
                          <span>Book</span>
                        </Link>
                      </li>
                    </Display>
                    <Display toggle={this.state.currentUser && this.state.currentUser.id === this.state.id}>
                      <li className="flex-1">
                        <Link className={buttonStyle} to={`/profile/${this.props.match.params.user_id}/update`}>
                          <span className="mr-2"><i className="fas fa-cogs"></i></span>
                          <span>Update Profile</span>
                        </Link>
                      </li>
                    </Display>
                </ul>
              </Display>
              <ul className="flex text-sm text-gray-500 mb-2">
                <li className="mr-5">
                  <span className="mr-2"><i className="fas fa-phone"></i></span>
                  <span>{ this.state.contactNumber }</span>
                </li>
                <li>
                  <span className="mr-2"><i className="fas fa-brain"></i></span>
                  <span>{ this.state.skill }</span>
                </li>
              </ul>
              <p>{ this.state.description }</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto mb-5">
          <Display toggle={!this.state.book.length}>
            <div className="text-center mb-5">No Bookers Available</div>
          </Display>
          <Display toggle={this.state.book.length}>
            <h1 className="text-3xl text-center">List of Bookers</h1>
            <ul className="flex flex-wrap">
              {this.state.book.map((book, index) => {
                return (
                  <li key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 overflow-hidden">
                    <Link to={`/profile/${ book.booker._id }`}>
                      <div className="max-w-sm rounded overflow-hidden hover:shadow-lg smooth shadow bg-white">
                        <div className="py-5 bg-cover bg-gray-300" style={{ backgroundImage: `url('${book.booker.coverPhoto}')` }}>
                          <img src={book.booker.profilePhoto} alt={book.booker.profilePhoto} className="rounded-full h-20 w-20 mx-auto" />
                        </div>
                        <div className="p-5">
                          <div className="mb-1"><span className="mr-1"><i className="far fa-calendar-alt"></i></span> { Moment(book.date).format("MMMM Do YYYY") || 'N/A' }</div>
                          <div className="mb-2 pb-2 border-b border-gray-300"><span className="mr-1"><i className="fas fa-compass"></i></span> { book.location || 'N/A' }</div>
                          <div className="mb-1"><span className="mr-1"><i className="fas fa-user"></i></span> { book.booker.name || 'N/A' }</div>
                          <div><span className="mr-1"><i className="fas fa-phone-alt"></i></span> { book.booker.contactNumber || 'N/A' }</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Display>
        </div>
      </div>
    )
  }
}

export default Profile;
