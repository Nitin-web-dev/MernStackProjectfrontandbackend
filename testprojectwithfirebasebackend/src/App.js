
import React, { useState } from "react";

import "./App.css";
import Admin from "./components/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentPortel from "./components/StudentPortel";
import StudentLogin from "./components/StudentLogin";
import ChoseSubject from "./components/ChoseSubject";
import AdminDashboard from "./components/AdminDashboard";
import HTML from "./components/HTML";
import CSS from "./components/CSS";
import JAVASCRIPT from "./components/JAVASCRIPT";


function App() {
  

  let adminlogin = false;
  if(sessionStorage.getItem('isAdmin')){
    adminlogin = true;
    // console.log('admin true')
    setTimeout(() => {
      sessionStorage.removeItem('isAdmin');
      adminlogin = false;
      window.location.href = '/'
      // console.log('logout');
  },1200000)
  }

  let admintestlogin = false;
  if(sessionStorage.getItem('isAdminTest')){
    admintestlogin = true;
    // console.log('admintest true')
    setTimeout(() => {
        sessionStorage.removeItem('isAdminTest');
        admintestlogin = false;
        window.location.href = '/'
        // console.log('logout');
    },1800000)
  }

  let userlogin = false;
  if(sessionStorage.getItem('isStudentLoggedIn')){
    userlogin = true;
    // console.log('studentlogin true')
  }
  
   

  const [isAdmin, setIsAdmin] = useState(adminlogin);
  const [isAdminTest, setIsAdminTest] = useState(admintestlogin);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(userlogin);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" element={<Admin isAdmins={setIsAdmin} />} />
        {isAdmin && (
          <Route
            path="/Admin/AdminDashboard"
            element={<AdminDashboard isAdmins={setIsAdmin} />}
          />
        )}

        <Route
          index
          element={<StudentPortel isAdminTests={setIsAdminTest} />}
        />
        <Route
          path="/studentportel"
          element={<StudentPortel isAdminTests={setIsAdminTest} />}
        />

        {isAdminTest && (
          <Route
            path="/studentportel/studentlogin"
            element={<StudentLogin isUserLoggedIns={setIsUserLoggedIn} />}
          />
        )}
        {isUserLoggedIn && (
          <>
            <Route
              path="/studentportel/chosesubject"
              element={<ChoseSubject />}
            />
            <Route path="/studentportel/exams/html" element={<HTML />} />
            <Route path="/studentportel/exams/css" element={<CSS />} />
            <Route path="/studentportel/exams/javascript" element={<JAVASCRIPT />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
