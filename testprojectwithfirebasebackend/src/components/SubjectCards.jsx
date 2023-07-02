import React from "react";
import "./subjectscards.css";

function SubjectCards(props) {
 

  return (
    
      <div className="carddivWrapper"  onClick={() => props.chosesub()}>
        <div className="cardsWrapper" title={props.titles}>
          <img className="imgs" src={props.imgSrc} alt={props.Alt} />
        </div>
        <h4>{props.titles}</h4>
      </div>
   
  );
}

export default SubjectCards;
