import FormTitle from "../FormTitle/formTitle.component";
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import Textarea from "../Textarea/textarea.component";
import Alert from "../Alert/alert.component";
import PlusBig from "../../assets/PlusBig.svg";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const AddCourse = ({closeModal , refreshData}) => {



    refreshData();

    const [courseTitle , setCourseTitle] = useState('');
    // console.log("course title is :" , courseTitle);
    const [note , setNote] = useState('');
    // console.log("note is :" , note);

    const [success , setSuccess] = useState(false);
    const [error , setError] = useState(false);

    const navigate = useNavigate();

  
    const onClose = () => {

      closeModal(false);
      navigate("/courses");

    }

    const handleCourseTitle = (e) => {
       setCourseTitle(e.target.value);
    }


    const handleNote = (value) => {

      // console.log("value is :" , value);
      setNote(value);

    }

    const handleAddCourse = () => {
      // console.log("course added");

      if (courseTitle == "")
      {
        setError(true);
        setSuccess(false);
      }

      else{

        const token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_BASE_URL}/api/Course`, {
            method: "POST",
            body:JSON.stringify({courseTitle:courseTitle , note:note}),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).
        then((response) => response.json()).
        then((data) => {
  
          setSuccess(data.success);
          // console.log(data.success);
          // if (data.success ==  true){
          //   alert("COURSE ADDED SUCCESSFULLY");
          //   navigate("/courses");
          //   onAddCourse(false);
          // }
  
        }).
        catch((err) => console.log("ERROR POST METHOD :" , err.message))

        setError(false);
        setSuccess(true);
        // refreshData();
      }
    
    }


    const handleCancel = () => {
      onClose(false);
      navigate("/courses");
    }

    // if (successStatus == true)
    //   {
    //     alert("course added successfully");
    //     setSuccessStatus(false);
    //   }

    return(
        <>
        {/*  form div starts here */}
        <div className="w-[520.5px] h-[fit-content] rounded-lg border border-secondary mx-auto bg-white">
          {/* form title comp */}
          <FormTitle title="Add Course" formClosed={onClose}/>

          {/*  actual form */}
          <form className="pt-3 px-5 pb-8 flex flex-col gap-y-4 w-[520px] h-[fit-content]">
            {/* FULL NAME DIV */}
            <div className="input-div-styles">
              <Label label="Course Title" />
              <input 
                type="text"
                placeholder="Course Title"
                className="input-styles"
                value={courseTitle}
                onChange={handleCourseTitle}
              />
            </div>
            <div className="flex flex-col gap-y-1 text-textSecondary">
              <Label label="Note" />
              <Textarea placeholder="Add Notes" note={handleNote} />
            </div>
          </form>

          {/*  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          {/*   Alert div */}
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
                description="Course added successfully!"
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
                description="Please fill the required field."
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
                text="Add Course"
                 onclick={handleAddCourse}
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


export default AddCourse;