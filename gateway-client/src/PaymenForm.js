import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { usePaymentForm } from './usePaymentForm';

const PaymentForm = () => {
  const { handleSubmit } = usePaymentForm();

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button>Pay</button>
    </form>
  );
};

export default PaymentForm;
