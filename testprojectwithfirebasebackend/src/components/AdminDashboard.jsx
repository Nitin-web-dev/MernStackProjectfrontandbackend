import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { firestore } from "../utils/firebase_config";

function AdminDashboard(props) {
  const navigator = useNavigate();
  const [displayStudentData, setDisplayStudentData] = useState([]);
  const [newStdData, setNewStdData] = useState({
    isStudent: true,
    userName: "",
    userpassword: "",
  });
  const [inputsearch, setInputsearch] = useState('');
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentData, setDocumentData] = useState([]);


  const handleCollectionSearch = async (e) => {
    e.preventDefault();
    if(inputsearch !== ''){

          
    
        try {
          console.log(inputsearch)
          const collectionRef = firestore.collection(inputsearch);
          const snapshot = await collectionRef.get();
  
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(data);
          setCollections(data);
        } catch (error) {
          console.error('Error fetching data from Firestore:', error);
        }
      

    }
    else{
      alert("fill the input before search")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = await  firestore.collection("students");
        const snapshot = await collectionRef.get();

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        

        setDisplayStudentData(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };




    fetchData();
  }, []);
  // console.log(displayStudentData);

  const handleLogout = (val) => {
    sessionStorage.removeItem("isAdmin");
    props.isAdmins(false);
    navigator("/Admin");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNewStdData((val) => ({ ...val, [name]: value }));
  };

  const handleNewStudentData = async (e) => {
    e.preventDefault();

    if (
      newStdData.isStudent === "" ||
      newStdData.userName === "" ||
      newStdData.userpassword === ""
    ) {
      alert("fill the inputs plz");
    } else {
      try {
        await firestore.collection("students").add(newStdData);
        alert("submit");

        setNewStdData({
          userName: "",
          userpassword: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    window.location.reload();
    // console.log('submit');
    // console.log(newStdData);
  };



  const handleCollectionChange = (e) => {
    setCollectionName(e.target.value);
  };

  const handleDocumentChange = (e) => {
    setDocumentName(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const documentRef = firestore
        .collection(collectionName)
        .doc(documentName);

      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        setDocumentData(data);
        console.log(typeof data);
      } else {
        setDocumentData(null);
      }
    } catch (error) {
      console.error('Error retrieving document:', error);
    }
  };

  return (
    <div className="AdminContainer">
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            Admin Panal
          </a>{" "}
          <button
            className="btn btn-outline-primary"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#studentListSection"
                    
                  >
                    studentListSection
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" 
                  href="#studentAdd">
                    studentAdd
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" 
                  href="#questionPaper">
                    questionPaper
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <section id="studentListSection" className="w-100 h-100 mt-5 pt-5">
        <h2>student lists</h2>

        <div className="container border">
          <table className="table">
            <thead>
              <tr>
                <th>is Student</th>
                <th>Student Name</th>
                <th>Student Password</th>
              </tr>
            </thead>
            <tbody>
              {displayStudentData.map((v) => {
                return (
                  <tr key={v.id}>
                    <td>{String(v.isStudent)}</td>
                    <td>{v.userName}</td>
                    <td>{v.userpassword}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <hr />
      <section id="studentAdd" className="w-100 h-100 mt-5 pt-5">
        <h2>Add Student sections</h2>
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                student Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="xxx#xx"
                name="userName"
                value={newStdData.userName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                student password
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="xxx#xx"
                name="userpassword"
                value={newStdData.userpassword || ""}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleNewStudentData} className="btn btn-primary">
              Add Student
            </button>
          </form>
        </div>
      </section>

      <hr />
      <section id="questionPaper">
      <div>
        <div>
          <input type="text" onChange={(e)=>setInputsearch(e.target.value)}  value={inputsearch}/>
          <button  className="btn btn-outline-primary" type="submit" onClick={handleCollectionSearch}>search by collection Name</button>
        </div>
      <h1>data in Firestore</h1>
      <ul>
      { collections && collections.map((item) => (
        <div key={item.id}>
        
          <h2>{item.id} : {item.question}</h2>
            <ul>
              {
                item.options.map((valueitems,idx) => (
                  <li key={idx}>{valueitems}</li>
                ))
              }
            </ul>
        
        
        
        
        </div>
      ))}
      </ul>
    </div>
      </section>
      <hr />
      <section id="studentexamQuestions">
      <div className="m-5">
      <input
        type="text"
        value={collectionName}
        onChange={handleCollectionChange}
        placeholder="Enter collection name"
      />
      <input
        type="text"
        value={documentName}
        onChange={handleDocumentChange}
        placeholder="Enter document name"
      />
      <button className=" btn btn-primary"onClick={handleSearch}>Search</button>

      {documentData ? (
        <div>
           <h2>Object:</h2>
           <pre>{JSON.stringify(documentData, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <h2>No Document Found</h2>
        </div>
      )}
    </div>
  
      </section>
    </div>
  );
}

export default AdminDashboard;
