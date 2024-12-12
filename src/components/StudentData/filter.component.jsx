import {useState} from 'react';

const StudentFilter = ({statusChange,resetFilter,onClearFilter}) => {
    // console.log('reset Filter :' , resetFilter);
    // console.log("subjectt :" , send_subject_to_quesComp);

     //HOOKS
    const [studentStatus , setStudentStatus] = useState('Select Status');
    // console.log("student status from filter comp ::::::::::::::::::;;;" , studentStatus);
    const status = [
      "New Registration",
      "Site Registration",
      "Assessment Assigned",
      "Assessment Performed",
      "Assessment Not Performed",
      "Pre Enrollment Evaluation",
      "Technical Evaluation",
      "Rejected",
      "Selected",
    ];
  
 

  //FUNCTIONS
  //this function triggered everytime we select a subject
  const handleStatus = (e) => {
   
    console.log("student status is :" , e.target.value);
    setStudentStatus(e.target.value);
    statusChange(e.target.value);
    onClearFilter(false);


  };

  if (resetFilter){
     statusChange("Select Status");
  }


    return(
        <>
        <div className="flex gap-x-3 h-10 w-[fit-content] text-sm">
        {/*  ITERATING SUBJECTS */}
        <select
          className="w-[188px] border text-textTertiary py-[10px] px-3 outline-none"
          onChange={handleStatus}
        >
          <option value="Select Status"  selected={resetFilter || studentStatus === "Select Status" ? true : false}>
            Select Status
          </option>
          {status.map((item) => {
            return (
              <>
                <option
                  value={item}
                >
                  {item}
                </option>
              </>
            );
          })}
        </select>
      </div>
        </>
    );
}


export default StudentFilter;