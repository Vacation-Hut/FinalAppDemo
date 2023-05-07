import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Activity from "./Pages/Activity";
import Addactivity from "./Pages/Addactivity";
import Updateactivity from "./Pages/Updateactivity";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import User from "./Pages/User";
import Order from "./Pages/Order";

import Checkout from "./Pages/Payment";
import Pottery from "./Pages/Pottery";
import Cart from "./Pages/Cart"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dash/activity" element={<Activity />}></Route>

        <Route path="/dash/users" element={<User />}></Route>
        <Route path="/dash/activity/new" element={<Addactivity />}></Route>
        <Route
          path="/dash/activity/:id/update"
          element={<Updateactivity />}
        ></Route>
        <Route path="/dash/activity/:id" element={<Pottery/>}></Route>
        <Route path="/dash/orders" element={<Order />}></Route>
        <Route path="/dash" element={<Dashboard />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
