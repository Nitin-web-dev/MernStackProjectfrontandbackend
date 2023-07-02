import React, {useEffect, useState} from "react";
import "./exam.css";
const ExamQuestionComp = ({question, options, Q_no, getValue}) => {
  const [value, setvalue] = useState(null);
  
  useEffect(() => {

    // console.log(Q_no , value);
    getValue(Q_no, value);
  },[value,Q_no])



  return (
    <div className="QuestionWrapper">
      <h2>{question}</h2>
    
      <div>
        <input type="radio" id={`${Q_no}_opt_1`} name={Q_no} value='a' onChange={(e) => setvalue(e.target.value)} />
        <label htmlFor={`${Q_no}_opt_1`}>{options[0]}</label>
        <br />
      </div>
      <div>
        <input type="radio" id={`${Q_no}_opt_2`} name={Q_no} value='b' onChange={(e) => setvalue(e.target.value)} />
        <label htmlFor={`${Q_no}_opt_2`}>{options[1]}</label>
        <br />
      </div>

      <div>
        <input type="radio" id={`${Q_no}_opt_3`} name={Q_no} value='c' onChange={(e) => setvalue(e.target.value)} />
        <label htmlFor={`${Q_no}_opt_3`}>{options[2]}</label>
        <br />
      </div>
      <div>
        <input type="radio" id={`${Q_no}_opt_4`} name={Q_no} value='d' onChange={(e) => setvalue(e.target.value)} />
        <label htmlFor={`${Q_no}_opt_4`}>{options[3]}</label>
        <br />
      </div>
    </div>
  );
};

export default ExamQuestionComp;
