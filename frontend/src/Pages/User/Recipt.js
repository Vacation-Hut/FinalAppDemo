// Receipt.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Receipt = () => {
  const { paymentId } = useParams();
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(`/get-receipt/${paymentId}`);
        const data = await response.json();
        setReceiptData(data);
      } catch (error) {
        console.error('Error retrieving receipt data:', error);
      }
    };

    fetchReceiptData();
  }, [paymentId]);

  if (!receiptData) {
    return <div>Loading receipt...</div>;
  }

  return (
    <div>
      <h1>Receipt</h1>
      <p>Payment ID: {receiptData.paymentId}</p>
      <p>Amount: {receiptData.amount}</p>
      <p>Currency: {receiptData.currency}</p>
      {/* Display more receipt details as needed */}
    </div>
  );
};

export default Receipt;
