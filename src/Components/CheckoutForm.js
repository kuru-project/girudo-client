import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

const CheckoutForm = (props) => {
  const buttonStyle = "block mb-5 w-full text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  const submit = async (e) => {
    let { token } = await props.stripe.createToken({ name: "Name" })
    let response = await fetch('https://maven-server-bos.herokuapp.com/charge', {
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
      <p>Sample Card: 5200 8282 8282 8210</p>
      <p>Sample ZIP: 58501</p>
      <CardElement />
      <button className={buttonStyle} onClick={submit}>Purchase</button>
    </div>
  )
}

export default injectStripe(CheckoutForm)
