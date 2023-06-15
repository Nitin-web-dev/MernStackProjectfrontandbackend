import React,{useState} from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [signupdata, setsignupdata] = useState({});

    const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
    
      setsignupdata(v => ({...v, [name]:value}));
      // console.log(signupdata)
  
    }
  
  
    const handleSubmit = async () => {
   
      try {
        
        let url = "http://localhost:8080/api/signup";
        const response = await axios.post(url, signupdata);
        console.log('Response:', response.data);
        // Handle the response data or perform additional actions
        if(response.data.message === 'Signup successful'){
          navigator('/');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    }
  return (
    <div className="bg-white backdrop-blur-lg shadow-xl p-8 border-1 rounded-xl">
      <h1 className="text-5xl font-semibold">SignUP</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        SigUp Please enter your details.
      </p>
      <div className="mt-8" >
        <div>
          <label className="text-lg font-medium" htmlFor="Email">
            Email
          </label>
          <input
            className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
            type="email"
            name="username"
            id="Email"
            value={signupdata.username || ""}
            onChange={ handleChange }
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div>
          <label className="text-lg font-medium" htmlFor="Password">
            Password
          </label>
          <input
            className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
            type="password"
            name="userpassword"
            id="Password"
            value={signupdata.userpassword || ""}
            onChange={ handleChange }
            placeholder="Enter Your Email"
            required
          />
        </div>

        <div>
          <input
            className="m-3 d-block w-3"
            type="checkbox"
            name="checkbox"
            id="checkbox"
          />
          <label className=" text-lg font-medium" htmlFor="Email">
            Remember for 30 days
          </label>
        </div>

        <button onClick={handleSubmit} className="active:scale-[.98] active:duration-75  hover:scale-[1.01] transition-all bg-green-400 p-3 w-full rounded-xl mt-6">
          signup
        </button>
      </div>
      <p className="mt-3">
        {" "}
        if already have an account   <Link className="text-blue-500" to="/">
          login
        </Link>
      </p>
      <Outlet />
    </div>
  );
};

export default Signup;
