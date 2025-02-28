import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { Login } from "../Pages/Login";
// import { SignUp } from '../Pages/SignUp';
// import Cookies from "js-cookie";
// import { OTPInput } from "../Pages/OtpSend";
import { Dashboard } from "../Pages/Dashboard";
import { OrderManagement } from "../Pages/OrderManagement";
import Notifications from "../Pages/Notifications";
import TastyDashboard from "../components/Header";
import AddInventoryItem from "../Pages/InventoryTable";
import { Home } from "../Pages/Home";
import { AddPizza } from "../components/Pizza";
// import OTPInput from '../Components/OtpSend';

export const Auth = () => {
//   const isAuthenticated = Cookies.get("token") || false;
  return (
    <>
        
       <Routes>
        <Route path="/" element={<Home/>}/>
            {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<AddPizza/>}/>
            <Route path="/inventory" element={<AddInventoryItem />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/*" element={<Navigate to={"/"}/>}/>

          </Routes>

        
        </>
        )}
     

