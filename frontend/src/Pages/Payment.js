import React, { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const Checkout = () => {
  const location = useLocation();
  const [product, setProduct] = useState({
    name: "Product",
    price: 10,
  });

  const handleToken = async (token, item) => {
    const response = await fetch("http://localhost:5000/dash/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [item],
        token: token,
      }),
    });
  
    const data = await response.json();
    console.log(data)

    if (data.success) {
      console.log("Payment succeeded");
    } else {
      console.log("Payment failed");
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const itemsParam = searchParams.get('items');
  
  let cartItems = [];
  if (itemsParam) {
    try {
      cartItems = JSON.parse(itemsParam);
    } catch (error) {
      console.error('Error parsing cart items JSON:', error);
    }
  }

  const handleProductUpdate = (items) => {
    let totalPrice = 0;
    let productName = "";
    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i].price * items[i].count;
      productName += items[i].name;
      if (i !== items.length - 1) {
        productName += ", ";
      }
    }

    setProduct({
      name: productName,
      price: totalPrice,
    });
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      handleProductUpdate(cartItems);
    }
  }, []);

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems && cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.count}</p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the cart.</p>
      )}
      <div>
      <StripeCheckout
                stripeKey="pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS"
                token={(token) => handleToken(token)}
                amount={product.totalPrice}
                
              >
                <button>Pay with Card</button>
              </StripeCheckout>
    </div>
    </div>
    
  );
};

export default Checkout;
