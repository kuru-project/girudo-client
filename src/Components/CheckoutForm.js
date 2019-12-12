import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import Axios from 'axios'
import ReactTooltip from 'react-tooltip'

const CheckoutForm = ({ stripe, date, contactNumber, artistId, bookerId, location }) => {
  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  const port = process.env.REACT_APP_SERVER_URL || "http://localhost:4000"
  const submit = async (event) => {
    let { token } = await stripe.createToken({ name: "Name" })

    if (token) {
      let response = await fetch(`${ port }/charge`, {
        method: "POST",
        headers: {"Content-type":"text-plain"},
        body: token.id
      })

      if (response.ok) {
        Axios.post(`${ port }/book/new`, {
          'date': date,
          'contactNumber': contactNumber,
          'artistId': artistId,
          'bookerId': bookerId,
          'location': location
        }, {
          headers: {
            'x-auth-token': sessionStorage.token
          }
        }).then(function(_) {
          window.location.replace('/');
        })
      }
    } else {
      console.log("Token does not exist.")
    }
  }

  return (
    <div className="checkout">
      <ReactTooltip />
      <div className="block text-gray-700 text-sm font-bold mb-2">
        <span>Payment Details</span><span className="ml-2 text-gray-500"><i className="fas fa-info-circle" data-tip="Card: 5200 8282 8282 8210 — Date: 11/23 — CVC: 652 — ZIP: 58501"></i></span>
      </div>
      <div className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
        <CardElement />
      </div>
      <button className={buttonStyle} onClick={submit}>
        Book
      </button>
    </div>
  )
}

export default injectStripe(CheckoutForm)
