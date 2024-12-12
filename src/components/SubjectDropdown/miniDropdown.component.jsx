import { useState, useEffect } from "react";

const MiniDropdown = ({
  send_subject_to_quesComp,
  send_quesType_to_quesComp,
  resetFilter,
}) => {
  /*  console.log('reset Filter :' , resetFilter); */
  //HOOKS

  //states for storing data into the states to it later
  const [subjects, setSubjects] = useState([
    { tittle: "Select Subject", id: 0 },
  ]);
  /* console.log('MINI DROPDOWN :' , subjects); */
  const [quesType, setQuesType] = useState([
    { typeTitle: "Select Type", id: 0 },
  ]);
  /* console.log('MINI DROPDOWN :' , quesType); */

  //using useEffect to fetch data so that data is mounted into the page
  useEffect(() => {
    const token = localStorage.getItem("token");
    //fetching ques type from endpoint
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/QuestionType?pageIndex=0&pageSize=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((info) => {
        setQuesType((current) => [...current.slice(0, 1), ...info.data]);
      })
      .catch((error) => console.error("Error:", error.message));

    //fetching subjects from this endpoint
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/Subject?pageIndex=0&pageSize=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((info) =>
        setSubjects((current) => [...current.slice(0, 1), ...info.data])
      )
      .catch((error) => console.error("Error:", error.message));
  }, []);

  //FUNCTIONS

  //this function triggered everytime we select a subject
  const handleSubject = (e) => {
    //getting name of subject from event(event.target.value)
    let subjectName = e.target.value;

    //iterating the subjects from db and comparing if the selected subject matches any subject from db so we can get the id
    for (var i = 0; i < subjects.length; i++) {
      if (subjectName === subjects[i].tittle) {
        send_subject_to_quesComp(subjects[i].tittle);
      }
    }
  };

  //this function triggered everytime we select question type
  const handleQuesType = (e) => {
    //getting name of subject from event(event.target.value)
    let type = e.target.value;
    /* console.log('ques type :' , type); */

    //iterating the subjects from db and comparing if the selected subject matches any subject from db so we can get the id
    for (var i = 0; i < quesType.length; i++) {
      if (type === quesType[i].typeTitle) {
        console.log("for loop block entered :");
        send_quesType_to_quesComp(quesType[i].typeTitle);
      }
    }
  };

  return (
    <>
      <div className="flex gap-x-3 h-10 w-[fit-content] text-sm">
        {/*  ITERATING SUBJECTS */}
        <select
          className="w-[188px] border text-textTertiary py-[10px] px-3 outline-none"
          onChange={handleSubject}
        >
          {subjects.map((subject, i) => {
            return (
              <>
                <option
                  value={subject.tittle}
                  key={i}
                  selected={
                    resetFilter && subject.tittle === "Select Subject"
                      ? true
                      : false
                  }
                >
                  {subject.tittle}
                </option>
              </>
            );
          })}
        </select>

        {/* ITERATING DROPDOWN */}
        <select
          className="w-[188px] border text-textTertiary py-[10px] px-3 outline-none"
          onChange={handleQuesType}
        >
          {quesType.map((type) => {
            return (
              <>
                <option
                  value={type.typeTitle}
                  key={type.id}
                  selected={
                    resetFilter && type.typeTitle === "Select Type"
                      ? true
                      : false
                  }
                >
                  {type.typeTitle}
                </option>
              </>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default MiniDropdown;
