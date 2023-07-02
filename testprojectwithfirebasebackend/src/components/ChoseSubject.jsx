import React from "react";
import { useNavigate } from "react-router-dom";
import SubjectCards from "./SubjectCards";
import htmlImg from "../imges/HTML5_logo_and_wordmark.svg.png";
import cssImg from "../imges/CSS3_logo_and_wordmark.svg.png";
import jsImg from "../imges/javascitimg.png";

function ChoseSubject(props) {
  const navigate = useNavigate();


  const handleSubject = (sub) => {
    console.log(sub);
   
    sessionStorage.setItem('SubjectCode', sub);
    navigate(`/studentportel/exams/${sessionStorage.getItem('SubjectCode')}`);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/studentportel');
  }
  const styles = {
    background: {
   
      height: "100dvh",

      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },
    LogoutBtn : {
      position: 'absolute',
      top: '5%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      padding: '20px 25px',
      border: '1px solid transparent',
      outline: 'transparent',
      borderRadius: '10px',
      
      backgroundImage: 'linear-gradient(lightgreen, lightblue)',
      boxShadow: '0 0 5px 0px rgba(0,0,0,.3)',
    
    }

  };
  return (
    <>
    <div >
      <button  style={styles.LogoutBtn} onClick={handleLogOut}>Logout</button>
    </div>
      <div style={styles.background}>
        <SubjectCards
          imgSrc={htmlImg}
          Alt="htmlImg"
          titles="HTML"
          chosesub={() => handleSubject("html")}
        />
        <SubjectCards
          imgSrc={cssImg}
          Alt="cssIMG"
          titles="CSS"
          chosesub={() => handleSubject("css")}
        />
        <SubjectCards
          imgSrc={jsImg}
          Alt="jsImg"
          titles="JAVASCRIPT"
          chosesub={() => handleSubject("javascript")}
        />
      </div>
    </>
  );
}

export default ChoseSubject;
