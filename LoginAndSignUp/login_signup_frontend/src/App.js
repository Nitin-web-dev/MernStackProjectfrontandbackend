import React from "react";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";

const App = () => {
  return (
       
          <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2 ">
    <BrowserRouter>
      <Routes>
              <Route index element={<Form />} />
              <Route path="signup" element={<Signup />} />
              <Route path="Welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
              <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full" />
              <div className="w-60 h-60 absolute  bg-white/10  backdrop-blur-lg animate-spin " />
            </div>
          </div>
       
  );
};

export default App;
