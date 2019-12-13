import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'
import Moment from 'moment'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      port: process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
      book: []
    }
  }

  componentDidMount() {
    Axios.get(`${ this.state.port }/book`)
      .then((response) => {
        this.setState({
          book: response.data
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
          <title>List of Bookings | Maven</title>
        </Helmet>
        <h1 className="text-3xl mb-5">List of Bookings</h1>
        <ul className="flex flex-wrap">
          {this.state.book.map((book, index) => {
            return (
              <li key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 overflow-hidden">
                <Link to={`/profile/${ book.artist._id }`}>
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <div className="py-5 bg-cover bg-gray-300" style={{ backgroundImage: `url('${book.artist.coverPhoto}')` }}>
                      <img src={book.artist.profilePhoto} alt={book.artist.profilePhoto} className="rounded-full h-20 mx-auto" />
                    </div>
                    <div className="p-5">
                      <div className="mb-1"><span className="mr-1"><i className="far fa-calendar-alt"></i></span> { Moment(book.date).format("MMMM Do YYYY") || 'N/A' }</div>
                      <div className="mb-1"><span className="mr-1"><i className="fas fa-compass"></i></span> { book.location || 'N/A' }</div>
                      <div className="mb-1"><span className="mr-1"><i className="fas fa-user"></i></span> { book.booker.name || 'N/A' }</div>
                      <div className="mb-1"><span className="mr-1"><i className="fas fa-phone-alt"></i></span> { book.booker.contactNumber || 'N/A' }</div>
                      <div className="mb-1"><span className="mr-1"><i className="fas fa-stamp"></i></span> { book.artist.name || 'N/A' }</div>
                      <div><span className="mr-1"><i className="fas fa-heart"></i></span> { book.artist.skill || 'N/A' }</div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ListBooks
