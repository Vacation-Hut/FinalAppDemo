import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ResponsiveDashBar from "./Dashboardnav";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    outline: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

function Order() {
  const [orderdata, setorderData] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [email,setEmail] = useState("")
  const [orderId, setorderid]=useState('')

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allorders`);
        const data = await response.json();
        setorderData(data.data);
      } catch (error) {
        console.error("Error retrieving receipt data:", error);
      }
    };

    fetchReceiptData();
  }, []);

console.log(orderdata)
  const handleOpen = (email,_id) => {
    setorderid(_id)
    setEmail(email)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/sentstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email, 
          date,
          place,
          time,
        }),
      });

      const data = await response.json()

      if (data.success) {
        try{
          const response = await fetch(`http://localhost:5000/dash/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status:"confirmed",
        }),
      });
        }
        catch(err){
          throw err
        }
        handleClose();
        // Handle success, e.g., show a success message
      }
    } catch (error) {
      console.error("Error sending receipt email:", error);
    }
  };

  return (
    <div>
      <ResponsiveDashBar />
      <h1 className="activity users">Bookings</h1>
      {orderdata && orderdata.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>N.I.C Number</th>
              <th>Passport Number</th>
              <th>Country</th>
              <th>Ordered Package</th>
              <th>Members</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {orderdata.map((item, index) => {
              const { customer, _id, status, items, totalprice } = item;
              
              const { name, email, phonenumber, nic, passportno, country } =
                customer;
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{status}</td>
                  <td>{email}</td>
                  <td>{phonenumber}</td>
                  <td>{nic}</td>
                  <td>{passportno}</td>
                  <td>{country}</td>
                  
                  <td>
            {items.map((packageItem, index) => (
              <div key={index}>{packageItem.packagename}</div>
            ))}
          </td>
          <td>
            {items.map((packageItem, index) => (
              <div key={index}>{packageItem.members}</div>
            ))}
          </td>
          <td>
            {items.map((packageItem, index) => (
              <div key={index}>{packageItem.date}</div>
            ))}
          </td>
                  <td>{totalprice}</td>
                  <td>
                    <button onClick={()=>handleOpen(email,_id)}>Accept</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        disableBackdropClick
      >
        <div className={classes.modalContent}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <TextField
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Order;