import React from 'react';
import { useLocation } from 'react-router-dom';

function RedirectedPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentStatus = searchParams.get('status');

  return (
    <div>
      {paymentStatus === 'success' ? (
        <h2>Payment Successful! Thank you for your purchase.</h2>
      ) : (
        <h2>Payment Failed. Please try again.</h2>
      )}
    </div>
  );
}

export default RedirectedPage;