import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import userImg from "../imges/icons8-user-90.png";
import  {firestore}  from '../utils/firebase_config';

function StudentLogin(props) {
  const navigator = useNavigate();
    const [formData, setFormData] = useState({
        UserName: "",
        UserPassword: "",
      });
    
    
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(val => ({...val, [name]:value}));
    
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('click')
     // Assuming you have a "users" collection in Firestore
     const usersRef = firestore.collection('students');
        
     // Check if the user with the provided email and password exists
     usersRef
       .where('userName', '==', formData.UserName)
       .where('userpassword', '==', formData.UserPassword)
       .where('isStudent','==', true)
       .get()
       .then((querySnapshot) => {
         if (!querySnapshot.empty) {
           // User found
           console.log('Login successful');
           sessionStorage.setItem('isStudentLoggedIn', true);
           sessionStorage.setItem('studentName', formData.UserName);
           if(sessionStorage.getItem('isStudentLoggedIn')){
            props.isUserLoggedIns(true)
        
            navigator('/studentportel/chosesubject');
   
               }
               
         } else {
           // User not found
           alert('invalid users')
           console.log('Invalid email or password');
         }
       })
       .catch((error) => {
         console.error('Error logging in:', error);
       });
    
        setFormData({
            UserName: "",
            UserPassword: "",
        })
      };
  return (
    <div className="contain">
    <div className="formWrapper">
      <div className="imgWrapper">
        <img className="imgs" src={userImg} alt="UserIMG" />
      </div>
      <h2>StudentLogin</h2>
      
      <form action="/#" method="POST" onSubmit={handleSubmit}>
        <div className="formInputWrapper">
          <label className=" inputLabel" htmlFor="UserName">
            Enter UserName: 
          </label>
          <input
            className="inputControl inputFields"
            type="text"
            placeholder="JohnDoe"
            required
            name="UserName"
            value={formData.UserName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="formInputWrapper">
          <label className=" inputLabel" htmlFor="Password">
            Enter Password:
          </label>
          <input
            className="inputControl inputFields"
            type="password"
            placeholder="XXXXXXXXX"
            required
            name="UserPassword"
            value={formData.UserPassword || ""}
            onChange={handleChange}
          />
        </div>
        <div className="formInputWrapper">
          <input
            className="inputControl buttons "
            type="submit"
            value="Login"
            id="btn"
          />
        </div>
      </form>
    </div>
  </div>
  )
}

export default StudentLogin
