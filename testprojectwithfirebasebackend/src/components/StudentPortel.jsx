import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { firestore } from "../utils/firebase_config";


function StudentPortel(props) {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    UserName: "",
    UserPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((val) => ({ ...val, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    // Assuming you have a "users" collection in Firestore
    const usersRef = firestore.collection("Users");

    // Check if the user with the provided email and password exists
    usersRef
      .where("userEmail", "==", formData.UserName)
      .where("userPassword", "==", formData.UserPassword)
      .where("isAdmin", "==", false)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // User found
          console.log("Login successful");
          sessionStorage.setItem("isAdminTest", true);
          if (sessionStorage.getItem("isAdminTest")) {
            props.isAdminTests(true);

            navigate("/studentportel/studentlogin");
          }
   
        } else {
          // User not found
          alert("invalid users");
          console.log("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });

    setFormData({
      UserName: "",
      UserPassword: "",
    });
  };
  return (
    <div >
      <Form
        user="Teacher Login"
        formDatas={formData}
        handleChanges={handleChange}
        handleSubmits={handleSubmit}
        buttonText="TeacherLogin"
        />
    
    </div>
  );
}

export default StudentPortel;
