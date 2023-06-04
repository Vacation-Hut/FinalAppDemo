import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { Navigate } from 'react-router-dom';

const Receipt = () => {
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/dash/orders/${id}`);
        const data = await response.json();

        setReceiptData(data);
        setCustomer(data.customer);
        setItems(data.items);
        
      } catch (error) {
        console.error('Error retrieving receipt data:', error);
      }
    };

    fetchReceiptData();
  }, [id]);

  if (!receiptData) {
    return <div>Loading receipt...</div>;
  }
const sendmail = async () => {
  try {
    const response = await fetch('http://localhost:5000/sentmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items:items,
        customerInfo: customer,
        orderID: id,
        total: receiptData.totalprice,
      }),
    });
    const data = await response.json();
    if(data.success) {
      Navigate("/")
    }// Handle the response from the backend, e.g., display a success message
  } catch (error) {
    console.error('Error sending receipt email:', error);
  }
};
  return (
    <div>
      <Typography variant="h5">Receipt</Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Customer Details</Typography>
        <Typography variant="body1">Name: {customer.name}</Typography>
        <Typography variant="body1">Email: {customer.email}</Typography>
        <Typography variant="body1">Phone Number: {customer.phonenumber}</Typography>
        <Typography variant="body1">Country: {customer.country}</Typography>
        <Typography variant="body1">Passport Number: {customer.passportno}</Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6">Package Details</Typography>
        {items.map((item, index) => (
          <Paper
            key={index}
            elevation={1}
            style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#F5F5F5' }}
          >
            <Typography variant="body1">Package: {item.package.package}</Typography>
            <Typography variant="body1">Price: {item.package.totalprice}</Typography>
            <Typography variant="body1">Date: {item.date}</Typography>
          </Paper>
        ))}
        <Typography variant="h6">Total: {receiptData.totalprice}</Typography>
      </Paper>
      <button onClick={sendmail} >Send me receipt</button>
    </div>
  );
};

export default Receipt;
