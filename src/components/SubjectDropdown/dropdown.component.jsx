import { useEffect, useState } from "react";

const Dropdown = ({ subjectID_from_child_to_parent, id }) => {
  //HOOKS:

  //USE STATE HOOK to store subjects data
  const [subjects, setSubjects] = useState(["select subject"]);
  /* console.log("Subjects from db , ", subjects); */

  //USE EFFECT HOOK to fetch data when comp is mounted
  useEffect(() => {
    const token = localStorage.getItem("token");
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
      .then((info) => setSubjects(info.data))
      .catch((error) => console.error("Error:", error.message));
  }, []);

  //FUNCTIONS

  //this function triggered everytime we select a subject
  const handleSubject = (e) => {
    //getting name of subject from event(event.target.value)
    let subject_name = e.target.value;

    //iterating the subjects from db and comparing if the selected subject matches any subject from db so we can get the id
    for (var i = 0; i < subjects.length; i++) {
      if (subject_name === subjects[i].tittle) {
        subjectID_from_child_to_parent(subjects[i].id);
      }
    }
  };

  return (
    <>
      <select className="input-styles" onChange={handleSubject}>
        {/*  iterating subjects */}
        {subjects.map((subject) => {
          return (
            <>
              <option
                value={subject.tittle}
                key={subject.id}
                selected={id === subject.id ? true : false}
              >
                {subject.tittle}
              </option>
            </>
          );
        })}
      </select>
    </>
  );
};

export default Dropdown;
