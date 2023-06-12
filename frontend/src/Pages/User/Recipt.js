import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import "./styles.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';

  

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.brown,
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

  const sendMail = async () => {
    try {
      const response = await fetch('http://localhost:5000/sentreceipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          customerInfo: customer,
          orderID: id,
          total: receiptData.totalprice,
        }),
      });
      const data = await response.json();
      if (data.success) {
        Navigate("/");
      }
      // Handle the response from the backend, e.g., display a success message
    } catch (error) {
      console.error('Error sending receipt email:', error);
    }
  };

  return (
    // <div className='receiptbackground'>
    //   <div className="left-side">
    //     {/* <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1686091057/hd_receipt_half_photo_f1gtn8.png" alt="Imagereceipt" className="image" /> */}
    //     <h2 className="receiptbrownheader">Receipt</h2>
    //     <div className='lightcolorbackgroundalign'>
    //       <img src='https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png' alt='Vacation Hut Logo' className='receiptlogoalign' />
    //       <h4 className='contactdetails'>Vacation Hut</h4>
    //       <p className='receiptmailaddress'>vacationapk@gmail.com</p>
    //       <p className='receiptmailaddress'>076 1238954</p>
    //       <h4 className='slogonreceipt'>Adventure awaits you...let us take you there.</h4>
    //       <p className='lightcolorbottemedit'>p</p>
    //     </div>
    //   </div>
    //   <div className="right-side receipt-container">
    //     <div className='rightsidewidthalignment'>
    //       <div className="containerreceipt">
    //         <div className="customer-detailsreceipt">
    //           <h4><em>Customer Details</em></h4>
    //           <p>Name: {customer.name}</p>
    //           <p>Email: {customer.email}</p>
    //           <p>Phone Number: {customer.phonenumber}</p>
    //           <p>Country: {customer.country}</p>
    //           <p>Passport Number: {customer.passportno}</p>
    //         </div>
    //       </div>

    //       <div className='packagereceiptalign'>
    //         <h4 className='packageinreceipt'><em>Package Details</em></h4>
    //         <TableContainer component={Paper}>
    //           <Table>
    //             <TableHead>
    //               <TableRow>
    //                 <StyledTableCell>
    //                   <h4>Package</h4>
    //                 </StyledTableCell>
    //                 <StyledTableCell>
    //                   <h4>Price</h4>
    //                 </StyledTableCell>
    //                 <StyledTableCell>
    //                   <h4>Date</h4>
    //                 </StyledTableCell>
    //               </TableRow>
    //             </TableHead>
    //             <TableBody>
    //               {items.map((item, index) => (
    //                 <TableRow key={index}>
    //                   <StyledTableCell>{item.package.package}</StyledTableCell>
    //                   <StyledTableCell>${item.package.totalprice}</StyledTableCell>
    //                   <StyledTableCell>{item.date}</StyledTableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </TableContainer>
    //       </div>

    //       <div className='totalpricereceiptalign'>
    //         <Typography variant="h4">$Total: {receiptData.totalprice}</Typography>
    //       </div>

    //       <div className='buttonreceiptalign'>
    //         <button onClick={sendMail} className="landbtn landbtnalign">Send me receipt</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    
    <div className="glass-containerrecieptpageedittings">
      <div id="mySidenav" class="sidenav sidebarDash">
        <h1 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', textAlign:'center', background:'#4e0d0d', color:'white', padding:'20px' }}>Receipt</h1>
<img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" style={{width:'230px', paddingTop:'100px'}}></img>
<div className='containerreceiptedittinganimation'>
<h2 style={{ fontFamily: 'Pacifico, cursive',  fontWeight: 'bold', paddingTop:'100px', paddingLeft:'20px'}} className="titleanimation"><span class="title-word title-word-1">Adventure</span><span class="title-word title-word-2"> awaits</span><span class="title-word title-word-3"> you... </span><br/><span class="title-word title-word-4">let</span><span class="title-word title-word-1"> us</span><span class="title-word title-word-2"> take</span><span class="title-word title-word-3"> you</span><span class="title-word title-word-4"> there.</span></h2>
</div>
</div>
<div style={{ paddingTop:'30px'}} className="contentDash">
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', width:'400px', background:'none'}}>
        <Typography variant="h3" style={{paddingTop:'10px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold',  color:'#4E0D0D'}}>Customer Details</Typography>
        <Typography variant="h6" style={{paddingTop:'20px'}}>Name: {customer.name}</Typography>
        <Typography variant="h6">Email: {customer.email}</Typography>
        <Typography variant="h6">Phone Number: {customer.phonenumber}</Typography>
        <Typography variant="h6">Country: {customer.country}</Typography>
        <Typography variant="h6">
        {customer.passportno ? `Passport Number: ${customer.passportno}` : `NIC: ${customer.nic}`}
      </Typography>
      </Paper>
      

      <Typography variant="h3" style={{ paddingTop: '20px', paddingLeft: '20px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold', color: '#4E0D0D' }}>Booking Details</Typography>
        <TableContainer component={Paper} style={{ boxShadow: 'none', background: 'none', paddingTop: '30px' }}>
          <Table style={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell><span style={{ fontSize: '25px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Package Name</span></TableCell>
                <TableCell><span style={{ fontSize: '25px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Total Price</span></TableCell>
                <TableCell><span style={{ fontSize: '25px', fontFamily: 'Pacifico, cursive', fontWeight: 'bold' }}>Date</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.package.package}</TableCell>
                  <TableCell>{item.package.totalprice}</TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              <TableRow style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold', color: '#4E0D0D', fontSize: '25px' }}>
                <TableCell colSpan={3} style={{ paddingLeft: '20px' }}>Total: ${receiptData.totalprice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>


    <button onClick={sendMail} style={{marginTop:'40px', padding:'5px'}} className="landbtn">Send me receipt</button>
    <div style={{ paddingTop: '20px' }}>
  <footer
    style={{
      background: 'rgba(240, 224, 218, 0.5)', // Transparent background
      backdropFilter: 'blur(10px)', // Adds blur effect
      borderRadius: '10px', // Rounded corners
      padding: '20px', // Adjust padding as needed
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <h3>
        {' '}
        <span
          style={{
            fontWeight: 'bold',
            color: '#ff3e00',
            fontFamily: 'Pacifico, cursive',
            fontSize:'40px',
          }}
        >
          Vacation
        </span>
        <span style={{ fontWeight: 'bold', color: '#5e4f47', fontSize:'40px', fontFamily: 'Pacifico, cursive'}}> Hut</span>
      </h3>
      <h3
        style={{
          fontFamily: 'Pacifico, cursive',
          fontWeight: 'bold',
          color: '#4E0D0D',
        }}
      >
        0761238954
      </h3>
      <h3
        style={{
          fontFamily: 'Pacifico, cursive',
          fontWeight: 'bold',
          color: '#4E0D0D',
        }}
      >
        vacationapk@gmail.com
      </h3>
    </div>
  </footer>
</div>

    </div>

    </div>
   
  );
};

export default Receipt;
