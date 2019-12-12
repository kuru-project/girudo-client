import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import Axios from 'axios'

const CheckoutForm = ({ stripe, date, contactNumber, artistId, bookerId, location }) => {
  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  const port = process.env.REACT_APP_SERVER_URL || "http://localhost:4000"
  const submit = async (event) => {
    let { token } = await stripe.createToken({ name: "Name" })

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
        'location': location,
        'status': "Approved"
      }, {
        headers: {
          'x-auth-token': sessionStorage.token
        }
      }).then(function(_) {
        window.location.replace('/');
      })
    }
  }

  return (
    <div className="checkout">
      <p>Amount: 2500</p>
      <p>Would you like to complete the purchase?</p>
      <p>Sample Card: 5200 8282 8282 8210</p>
      <p>Sample ZIP: 58501</p>
      <CardElement />
      <button className={buttonStyle} onClick={submit}>
        Book
      </button>
    </div>
  )
}

export default injectStripe(CheckoutForm)
