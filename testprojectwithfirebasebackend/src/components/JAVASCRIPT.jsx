import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./exam.css";
import ExamQuestionComp from "./ExamQuestionComp";
import { firestore } from "../utils/firebase_config";

const JAVASCRIPT = () => {
  const navigator = useNavigate();
  const [jsData, setJsData] = useState([]);
  const [btnClick, setBtnClick] = useState(false);
  const [submitData, setSubmitData] = useState([]);
  useEffect(() => {
    const fetchQuestion = async () => {
      // Assuming you have a "users" collection in Firestore
      const jsQuestionPaper = firestore.collection("jsQuestionPaper");
      const snapShot = await jsQuestionPaper.get();
      const questionsData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedQuestionsData = questionsData.sort((a, b) => {
        const idA = parseInt(a.id.replace("htmlQno_", ""));
        const idB = parseInt(b.id.replace("htmlQno_", ""));

        return idA - idB;
      });
      setJsData(sortedQuestionsData);
    };

    fetchQuestion();
  }, []);
  // console.log(htmlData);

  const btnAnimtion = () => {
    setBtnClick((btnClick) => !btnClick);
    setTimeout(() => {
      setBtnClick((btnClick) => !btnClick);
    }, 500);
    // console.log(btnClick);
  };

  const formData = (q, v) => {
    setSubmitData((value) => {
      return {
        ...value,
        [q]: v,
      };
    });
  };

  const handleSubmit =   (e) => {
    e.preventDefault();
    btnAnimtion();

    console.log(submitData)
        let studentName = sessionStorage.getItem('studentName');
        // console.log(studentName)
          // Save students's exam data
              firestore.collection('student_exam_js').doc(studentName).set(submitData)
            .then(() => {
              console.log(`${studentName}'s exam data saved successfully!`);
            })
            .catch((error) => {
              console.error(`Error saving ${studentName}'s exam data: `, error);
            });

            navigator('/studentportel/chosesubject');
          
  };
  return (
    <div className="exam_container">
      <h1>JAVASCRIPT   EXAM</h1>
      <form>
        <div className="examQuestionandAnswerWrapper">
          {jsData.map((value) => {
            return (
              <>
                <ExamQuestionComp  key={value.id} question={value.question}  Q_no={value.id}  options={value.options} getValue={formData}/>
     
              </>
            );
          })}
        </div>
        <button
          className={`Submit ${btnClick ? "clicked" : ""}`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default JAVASCRIPT
