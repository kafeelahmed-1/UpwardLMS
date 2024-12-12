import FormTitle from "../FormTitle/formTitle.component";
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import Textarea from "../Textarea/textarea.component";
import Alert from "../Alert/alert.component";
import CheckIconBig from "../../assets/checkIconBig.svg";
import {useParams} from 'react-router-dom';
import {useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";


const EditCourse = ({closeModal , refreshData}) => {

    refreshData();
    const {id} = useParams();
    // console.log("edit id is :" , id);

    const [courseDetails , setCourseDetails] = useState([]);
    // console.log("COURAS DETAILSSS :" , courseDetails);

    const [success , setSuccess] = useState(false);
    const [error , setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_BASE_URL}/api/Course/${id}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).
      then((response) => response.json()).
      then((data) => setCourseDetails(data.data))

    } , []);


    const onClose = () => {

        closeModal(false);
        navigate("/courses")

  
      }

    const handleCancel = () => {
       closeModal(false);
       navigate("/courses")

    }

    const handleQuestionTitle = (e) => {
       
          setCourseDetails({
            ...courseDetails,
            courseTitle:e.target.value
          });

    }



    const handleNotes = (val) => {

      setCourseDetails({
        ...courseDetails,
        note:val
      });

      console.log("notes from edit course comp :"  , val);
    }


    const handleEditCourse = () => {
      

      if (courseDetails.courseTitle == ""){
        setError(true);
        setSuccess(false);
      }

      else{
        const token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_BASE_URL}/api/Course/${id}`, {
          method: "PUT",
          body:JSON.stringify({id:id, courseTitle:courseDetails.courseTitle , note:courseDetails.note}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).
        then((response) => response.json()).
        then((data) => {

          setSuccess(data.success);
          // console.log("DATA " , data);
          // if (data.success ==  true){
          //   alert("COURSE UPDATED SUCCESSFULLY");
          //   navigate("/courses");
          //   onEditCourse(false);
          // }

        }).
        catch((err) => console.log("ERROR POST METHOD :" , err.message))

        setError(false);
        setSuccess(true);
        // refreshData();

      }
      

      }


 
    return(
        <>
        {/*  form div starts here */}
        <div className="w-[520.5px] h-[fit-content] rounded-lg border border-secondary mx-auto bg-white">
        {/* form title comp */}
        <FormTitle title="Edit Course" formClosed={onClose}/>

        {/*  actual form */}
        <form className="pt-3 px-5 pb-8 flex flex-col gap-y-4 w-[520px] h-[fit-content]">
          {/* FULL NAME DIV */}
          <div className="input-div-styles">
            <Label label="Course Title" />
            <input
              type="text"
              placeholder="Course Title"
              className="input-styles"
              value={courseDetails.courseTitle}
              onChange={handleQuestionTitle}
            />
          </div>
          <div className="flex flex-col gap-y-1 text-textSecondary">
            <Label label="Note" />
            <Textarea placeholder="Add Notes" note={handleNotes} notesOnEdit={courseDetails.note} />
          </div>
        </form>

        {/*  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

  
          {/*Alert div */}
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
                description="Course updated successfully!"
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
              text="Save Changes"
               onclick={handleEditCourse}
              icon="left"
              src={CheckIconBig}
            />
          </div>
        </div>

        {/*   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      </div>

      </>
    );
}


export default EditCourse;