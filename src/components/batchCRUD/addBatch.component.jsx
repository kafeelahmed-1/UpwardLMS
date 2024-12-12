import FormTitle from "../FormTitle/formTitle.component";
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import Textarea from "../Textarea/textarea.component";
import Alert from "../Alert/alert.component";
import PlusBig from "../../assets/PlusBig.svg";
import { useState , useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AddBatch = ({closeModal , refreshData}) => {


  refreshData();
  
    const [batchDetails , setBatchDetails] = useState({
        batchTitle:"",
        startDate:"",
        endDate:"",
        note:"",
        courseId:""
    });
    // console.log("batch details :" , batchDetails);

    const [courses , setCourses] = useState([]);
    // console.log("courses array :" , courses);

    const [success , setSuccess] = useState(false);
    console.log("success :" , success);
    const [error , setError] = useState(false);
    console.log("error :" , error);

    const navigate = useNavigate();


    useEffect(() => {

        const token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_BASE_URL}/api/Course?pageIndex=0&pageSize=123`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).
        then((response) => response.json()).
        then((data) => setCourses(data.data))

    } , []);

  
    const onClose = () => {

      closeModal(false);
      navigate("/batch");

    }

    const handleCancel = () => {
      closeModal(false);
      navigate("/batch");

    }

    const handleBatchTitle = (e) => {
       setBatchDetails({
        ...batchDetails,
        batchTitle:e.target.value
       });
    }


    const handleStartDate = (e) => {

        setBatchDetails({
            ...batchDetails,
            startDate:e.target.value
        });

    }


    const handleEndDate = (e) => {
      
        setBatchDetails({
            ...batchDetails,
            endDate:e.target.value
        });

    }


    const handleCourse = (e) => {
    
      console.log("handle course 4:" , e.target.value);
        setBatchDetails({
            ...batchDetails,
            courseId:parseInt(e.target.value)
        });


    }


    

    const handleNote = (value) => {

      // console.log("value is :" , value);
     setBatchDetails({
        ...batchDetails,
        note:value
     });

    }



    const handleAddBatch = () => {

      // console.log("course added");
      if (batchDetails.batchTitle == "" || batchDetails.startDate == "" || batchDetails.endDate == "" || courses.courseTitle == "")
      {
        setError(true);
        setSuccess(false);
      }

      else{

        const token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_BASE_URL}/api/Batch`, {
            method: "POST",
            body:JSON.stringify(batchDetails),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).
        then((response) => response.json()).
        then((data) => {
          setSuccess(data.success);
          // console.log(data.success);
          // if (data.success == true){
          //   alert("BATCH ADDED SUCCESSFULLY");
          // }
  
        }).
        catch((err) => console.log("ERROR POST METHOD :" , err.message));


        setError(false);
        // setSuccess(true);
        // refreshData();
      }

    }



    return(
        <>
         {/*  form div starts here */}
         <div className="w-[520.5px] h-[fit-content] rounded-lg border border-secondary mx-auto bg-white">
          {/* form title comp */}
          <FormTitle title="Add Batch"  formClosed={onClose} />

          {/*  actual form */}
          <form className="pt-3 px-5 pb-8 flex flex-col gap-y-4 w-[520px] h-[fit-content]">
            {/* FULL NAME DIV */}
            <div className="input-div-styles">
              <Label label="Batch Title" />
              <input 
                type="text"
                placeholder="Batch Title"
                className="input-styles"
                value={batchDetails.batchTitle}
                onChange={handleBatchTitle}
              />
            </div>

            <div className="input-div-styles">
              <Label label="Start Date" />
              <input 
                type="date"
                placeholder="Start Date"
                className="input-styles"
                min='1899-01-01'
                value={batchDetails.startDate}
                onChange={handleStartDate}
              />
            </div>

            <div className="input-div-styles">
              <Label label="End Date" />
              <input 
                type="date"
                placeholder="End Date"
                className="input-styles"
                value={batchDetails.endDate}
                onChange={handleEndDate}
              />
            </div>


            {/* Courses field */}
            <div className="input-div-styles">
              <Label label="Course" />
              <select 
                // value="Artificial Intelligence"
                onChange={handleCourse}
                className="input-styles"
              >
                <option value="" disabled selected>
                  Choose Course
                </option>
                {courses.map((option) => (
                  <option key={option.id} id={option.id} value={option.id}>
                    {option.courseTitle}
                  </option>
                ))}
              </select>
            </div>


            <div className="flex flex-col gap-y-1 text-textSecondary">
              <Label label="Note" />
              <Textarea placeholder="Add Notes" note={handleNote} />
            </div>
          </form>

          {/*  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          {success && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Alert
                alert_type="successLight"
                title="Success"
                description="Batch added successfully!"
              />
            </div>
          )}

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Alert
                alert_type="errorLight"
                title="Error"
                description="Please fill all the required fields."
              />
            </div>
          )}

          {/*  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}


          {/*  BUTTONS DIV */}
          {/*  div for cancel and add ques button */}
          <div className="w-[520px] h-[84px] p-5 flex justify-end">
            <div className="flex gap-x-4">
              {/*   Button comp */}
              <Button
                button_type="tertiary"
                button_size="medium"
                text="Cancel"
                onclick={handleCancel} 
                icon="none"
                src=""
              />
              <Button
                button_type="primary"
                button_size="medium"
                text="Add Batch"
                onclick={handleAddBatch}
                icon="left"
                src={PlusBig}
              />
            </div>
          </div>

          {/*   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        </div>
        </>
    );
}


export default AddBatch;