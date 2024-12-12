import {useState , useEffect} from 'react';

const EnrollmentFilter = ({resetFilter , onClearFilter , onCourseChange , onBatchChange}) => {
    // console.log('reset Filter :' , resetFilter);
    // console.log("subjectt :" , send_subject_to_quesComp);

     //HOOKS
    const [batches , setBatches] = useState([]);
    // console.log("batch from EF :" , batches);
    const [courses , setCourses] = useState([]);
    // console.log("courses from EF :" , courses);
   
    const [resetBatch , setResetBatch] = useState(false);
    console.log("batch reset to select batch -----------------------------------" , resetBatch);

    const [enableBatch , setEnableBatch] = useState(false);



    useEffect(() => {

        const token = localStorage.getItem("token");

        //fetch courses
        fetch(`${process.env.REACT_APP_BASE_URL}/api/Course?pageIndex=0&pageSize=123`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).
        then((response) => response.json()).
        then((data) => setCourses(data.data))


    } , []);

 

  //FUNCTIONS
  //this function triggered everytime we select a course
  const handleCourse = (e) => {
   
    
    // console.log("selected course is :" , e.target.value);
    onClearFilter(false);
    onCourseChange(e.target.value);
    onBatchChange("Select Batch");
    setResetBatch(true);

 
    const token = localStorage.getItem("token");

    let courseId = courses.filter((item) => {
      console.log("item id :" , item.id);
      return item.courseTitle === e.target.value
        ? //fetch batches by course id
          fetch(
            `${process.env.REACT_APP_BASE_URL}/api/Batches/Course/${item.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((response) => response.json())
            // then((data) => setBatches(data.data)).
            .then((data) => setBatches(data.data))
        : '';

    });

    // console.log(courseId);

    if (e.target.value !== 'Select Course' || resetFilter){
      setEnableBatch(true);
    }

    else{
      setEnableBatch(false);
    }

  }


  const handleBatch = (e) => {
    // console.log("Selected Batch is :" , e.target.value);
    onClearFilter(false);
    onBatchChange(e.target.value);
    
    // console.log("course id to fetch batch:" , e.target.id);

  }

  

  if (resetFilter)
  {
    onCourseChange("Select Course");
    onBatchChange("Select Batch");
    // setEnableBatch(false);
  }


    return(
        <>
        <div className="flex gap-x-3 h-10 w-[fit-content] text-sm">

        {/*  ITERATING COURSES*/}
        <select
          className="w-[188px] border text-textTertiary py-[10px] px-3 outline-none"
          onChange={handleCourse}
        >
          <option value="Select Course" selected={resetFilter  ? true : false}>
            Select Course
          </option>
          {courses.map((item) => {
            return (
              <>
                <option
                  value={item.courseTitle}
                  // id={item.id}
                  
                  // selected={stude? true : false}
                >
                  {item.courseTitle}
                </option>
              </>
            );
          })}
        </select>


        {/*  ITERATING BATCHES*/}
        <select
          className="w-[188px] border text-textTertiary py-[10px] px-3 outline-none"
          onChange={handleBatch}
          disabled={enableBatch ? false : true}
        >
          <option value="Select Batch" selected={resetFilter ? true : false}>
            Select Batch
          </option>
          {batches.map((item) => {
            return (
              <>
                <option
                  value={item.batchTitle}
                //   selected={resetFilter && studentStatus === "Select Status" ? true : false}
                >
                  {item.batchTitle}
                </option>
              </>
            );
          })}
        </select>

      </div>
      </>
    );
}


export default EnrollmentFilter;