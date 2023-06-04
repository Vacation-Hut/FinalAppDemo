import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";





const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    width: 700,
    // margin: "auto",
    boxShadow: '5px 10px rgba(240, 224, 218)',
    borderRadius: 30
  },
  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: "initial"
  }
}));

 const CardNewsDemo = React.memo(function CardNews({ activeIndex = 0,image, packagename, price, id }) {
  const styles = useStyles();
  const [data ,setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [date, setDate] = useState(null);
  const Navigate = useNavigate();
  const [count ,setCount] = useState();
  const n = 6;

  useEffect(() => {
    fetch("http://localhost:5000/allpackage", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        const allImages = data.data.map((packages) => packages.images[0].url);
        setImages(allImages);
      });
  }, []);
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleMembersChange = (e) => {
    const selectedCount = parseInt(e.target.value);
    setCount(selectedCount);
  };


  const handleAddToCart = (image, id, activityname, totalprice) => {
    if (!date || !count) {
      // Dates not selected, handle the error accordingly
      alert("Please select a date and members.");
      return;
    }
    let additionalCost = 0;
    if (count > 8) {
      const extraMembers = count - 8;
      additionalCost = Math.ceil(extraMembers / 5) * 10;
    }
  
    const totalPrice =totalprice + additionalCost;
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        image:image,
        _id: id,
        name: activityname,
        price: totalPrice,
        count: count,
        date: date.toLocaleDateString(),
       
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount((prevCount) => prevCount + 1);
      // Navigate("/")
    }
    
  };

  const handleBookNow = (image, id, activityname, description, price) => {
    if (!date || !count) {
      alert("Please select a date and enter the number of members.");
      return;
    }
  
    try {
      handleAddToCart(image, id, activityname, description, price, date);
      Navigate("/cart");
    } catch (err) {
      throw err;
    }
  };
  


  return (
    <Card className={styles.root} style={{ borderRadius: "30px" }}>
      
      <CardMedia
        style={{
          height: "400px",
          width: "700px",
          filter: activeIndex !== 0 ? "blur(2px)" : "none",
          borderRadius: "30px", // Add the border radius here

        }}
        image={image}
         
      />
      
        {activeIndex === 0 && (
      <CardContent className={styles.content}>
          <div className="packagecarousel">
        <h3>{packagename}</h3>
        <h3>${price}</h3>
        <Grid container spacing={1}>
        <Grid item xs={6}>
                 <div>
                      <form>
                        <div>
                          <label>Date:</label>
                          <DatePicker
                            selected={date}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="datefield"
                          />
                        </div>
                      </form>
                    </div>
                    </Grid>
                    <Grid item xs={6}>
                    <div>
                 <label>Members:</label> <br/>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => handleMembersChange(e,count)}
                  min="1"
                  className="datefield"
                /><br></br>
                 {count > 8 && <span className="alert">More than 8 People for every additional 5 people we pay 5$.  .</span>}
                    </div>
                    </Grid>
                    </Grid>

                    
                    <div className="carouselbutton">
                    <Grid container spacing={1}>
                    <Grid item xs={6}>
                     <button
                      className="landbtn"
                      onClick={() =>
                        handleBookNow(
                          image,
                          id,
                          packagename,
                          price,
                          date
                        )
                      }
                    >
                      book now
                    </button>
                   </Grid>
                   <Grid item xs={6}>
                    <button
                      className="landbtn"
                      onClick={() =>
                        handleAddToCart(
                          image,
                          id,
                          packagename,
                          price,
                          date
                        )
                      }
                    >
                      Add to cart
                    </button>
                    </Grid>
                    </Grid>
                    </div>
                    
                    
        <Button   color={"primary"} fullWidth className={styles.cta}>
          <Link to={`/package/${id}`}>View More</Link> <ChevronRightRounded />
        </Button>
        </div>
        
      </CardContent>
      )}
    </Card>
  );
});

export default CardNewsDemo;

