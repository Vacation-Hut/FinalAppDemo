
import './App.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Signup"
import Activity from "./Activity"
import Addactivity from "./Addactivity"
import Updateactivity from "./Updateactivity"
import Home from "./Home"
import Dashboard from './Dashboard';

function App() {
  return (
   
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dash/activity' element={<Activity/>}></Route>
        <Route path='/dash/activity/new' element={<Addactivity/>}></Route>
        <Route path='/dash/activity/update' element={<Updateactivity/>}></Route>
        <Route path='/dash' element={<Dashboard />}></Route>
       
      </Routes>
    </BrowserRouter>
  
  )
}

export default App;
