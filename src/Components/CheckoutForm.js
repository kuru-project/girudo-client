import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

const CheckoutForm = (props) => {
  const submit = async (e) => {
    let { token } = await props.stripe.createToken({ name: "Name" })
    let response = await fetch('http://localhost:4000/charge', {
      method: "POST",
      headers: {"Content-type":"text-plain"},
      body: token.id
    })

    if (response.ok) console.log("Purchase Complete")
  }
  return (
    <div className="checkout">
      <p>Amount: 2500</p>
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={submit}>Purchase</button>
    </div>
  )
}

export default injectStripe(CheckoutForm)
