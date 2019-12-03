import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'

class ListBooks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      book: []
    }
  }

  componentDidMount() {
    Axios.get('https://maven-server-bos.herokuapp.com/book')
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
          <title>List of Bookings</title>
        </Helmet>
        <h1 className="text-3xl mb-5">List of Bookings</h1>
        <ul>
          {this.state.book.map((book, index) => {
            return (
              <li key={index}>
                {index+1}. { book.name }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ListBooks
