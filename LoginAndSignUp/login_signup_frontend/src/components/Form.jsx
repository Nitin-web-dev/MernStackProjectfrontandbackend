import React,{useState} from "react";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [logindata, setlogindata] = useState({});
  const navigator = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  
    setlogindata(v => ({...v, [name]:value}));
    // console.log(logindata)

  }


  const handleSubmit = async () => {

    try {
      let url = "http://localhost:8080/api/login";
      const response = await axios.post(url, logindata);
      console.log('Response:', response.data);
      // Handle the response data or perform additional actions

      if(response.data.message === 'Login successful'){
        navigator('/Welcome')
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  }

  return (
    <div className="bg-white backdrop-blur-lg shadow-xl p-8 border-1 rounded-xl">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details.
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
            value={logindata.username || ""}
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
            value={logindata.userpassword || ""}
            onChange={handleChange}
            placeholder="Enter Your Password"
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
          Login
        </button>
      </div>
      <p className="mt-3">
        {" "}
        if New Here{" "}
        <Link className="text-blue-500" to="/signup">
          signUP
        </Link>
      </p>
      <Outlet />
    </div>
  );
};

export default Form;
