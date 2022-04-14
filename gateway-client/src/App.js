import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
function App() {
  return (
    <>
      <div id="paypal-button-container"></div>

      {/* <PayPalScriptProvider
        options={{
          'client-id':
            'AYR-z2pY1KXkM4zqI-2oMIDzFwWgC2c30heXqfEVjavRo2v7bQbr_H1jPmVHCKbzbeT5_d0Wjcx6Hrf3',
        }}
      >
        <PayPalButtons style={{ layout: 'horizontal' }} />
      </PayPalScriptProvider> */}
    </>
  );
}

export default App;
