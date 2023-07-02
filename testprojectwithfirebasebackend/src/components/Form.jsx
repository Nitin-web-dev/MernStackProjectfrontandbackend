import React from "react";
import "./form.css";
import userImg from "../imges/icons8-user-90.png";

function Form(props) {
 

  return (
    <div className="contain">
    <div className="formWrapper">
      <div className="imgWrapper">
        <img className="imgs" src={userImg} alt="UserIMG" />
      </div>
      <h2>{props.user}</h2>
      
      <form action="/#" method="POST" onSubmit={(e) => props.handleSubmits(e)}>
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
            value={props.formDatas.UserName || ""}
            onChange={(e) => props.handleChanges(e)}
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
            value={props.formDatas.UserPassword || ""}
            onChange={(e) => props.handleChanges(e)}
          />
        </div>
        <div className="formInputWrapper">
          <input
            className="inputControl buttons "
            type="submit"
            value={props.buttonText}
            id="btn"
          />
        </div>
      </form>
    </div>
  </div>
  )
}

export default Form;


