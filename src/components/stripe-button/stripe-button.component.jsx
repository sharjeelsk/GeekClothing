import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price*100;
    const publishableKey = "pk_test_51H7wfrFBgtHjVn7zkprm7QvUKyH4gTfPvAFVP6d6ZOGQf1AD205LINTMJ8yulugS0Fs94S82ptJTtO2yHHsdRhVj004kKaOkBB"
   
   const onToken=token=>{
       console.log(token)
       alert("Payment successfule")
   }
   
    return (
        <StripeCheckout
        label="Pay Now"
        name = "CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description = {`your total is $${price}`}
        amount = {priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}

        />
    );
}

export default StripeCheckoutButton;