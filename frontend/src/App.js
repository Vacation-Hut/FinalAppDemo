import "./App.css";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Activity from "./Activity";
import Addactivity from "./Addactivity";
import Updateactivity from "./Updateactivity";
import Home from "./Home";
import Dashboard from "./Dashboard";
import User from "./User";
import Order from "./Order";

import Payment from "./Payment";
import Pottery from "./Pottery";
import ProductPage from "./book";

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
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/book/:id" element={<ProductPage />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
