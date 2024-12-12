import FormTitle from "../FormTitle/formTitle.component";
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import Textarea from "../Textarea/textarea.component";
import Alert from "../Alert/alert.component";
import PlusBig from "../../assets/PlusBig.svg";
import CheckIconBig from "../../assets/checkIconBig.svg";
import {useState , useEffect} from 'react';
import { useNavigate , useParams } from "react-router-dom";

const EditBatch = ({closeModal , refreshData}) => {


    refreshData();

    const navigate = useNavigate();
    const {id} = useParams();

    const [batchDetails , setBatchDetails] = useState([]);
    console.log("EDITTT batch details :" , batchDetails);

    const [success , setSuccess] = useState(false);
    // console.log("success :" , success);
    const [error , setError] = useState(false);
    // console.log("error :" , error);

    const [courses , setCourses] = useState([]);


    useEffect(() => {

        const token = localStorage.getItem("token");

        //fetching data by id from batch api
        fetch(`${process.env.REACT_APP_BASE_URL}/api/Batch/${id}`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).
        then((response) => response.json()).
        then((data) => {
           //formatting batch's start date
           const date = new Date(data.data.startDate);
           const formattedStartDate = `${date.getFullYear()}-${String(
           date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          //formatting batch's end date
          const date_ = new Date(data.data.startDate);
          const formattedEndDate = `${date_.getFullYear()}-${String(
          date_.getMonth() + 1
         ).padStart(2, "0")}-${String(date_.getDate()).padStart(2, "0")}`;

          setBatchDetails({...data.data , startDate:formattedStartDate , endDate:formattedEndDate});
        });


        //fetching data from courses api
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
    //on closing modal
    const onClose = () => {

      closeModal(false);
      navigate("/batch");

    }

    //on cancel button
    const handleCancel = () => {
      closeModal(false);
      navigate("/batch");

    }

    //on typing batch title
    const handleBatchTitle = (e) => {
       setBatchDetails({
        ...batchDetails,
        batchTitle:e.target.value
       });
    }


    //on selecting start date
    const handleStartDate = (e) => {

        setBatchDetails({
            ...batchDetails,
            startDate:e.target.value
        });

    }


    //on selecting end date
    const handleEndDate = (e) => {
      
        setBatchDetails({
            ...batchDetails,
            endDate:e.target.value
        });

    }


    //on choosing course
    const handleCourse = (e) => {
      
        setBatchDetails({
            ...batchDetails,
            courseId:parseInt(e.target.value)
        });


    }

    
    //on typing note
    const handleNote = (value) => {

    // console.log("value is :" , value);
     setBatchDetails({
        ...batchDetails,
        note:value
     });

    }



    //on save changes
    const handleEditBatch = () => {


      if (batchDetails.batchTitle == "" || batchDetails.startDate == "" || batchDetails.endDate == "" || batchDetails.courseDetail?.courseTitle == "")
      {
        setError(true);
        setSuccess(false);
      }

      else{
        const token = localStorage.getItem("token");

        //editing data 
        fetch(`${process.env.REACT_APP_BASE_URL}/api/Batch/${id}`, {
            method: "PUT",
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
          //   alert("BATCH UPDATED SUCCESSFULLY");
          // }
  
        }).
        catch((err) => console.log("ERROR POST METHOD :" , err.message));

        setSuccess(true);
        setError(false);
        // refreshData();


      }
     

    }




    return(
        <>

         {/*  form div starts here */}
         <div className="w-[520.5px] h-[fit-content] rounded-lg border border-secondary mx-auto bg-white">
          {/* form title comp */}
          <FormTitle title="Edit Batch"  formClosed={onClose} />

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
                  <option key={option.id} id={option.id} value={option.id} selected={option.courseTitle == batchDetails.courseDetail?.courseTitle ? true : false}>
                    {option.courseTitle}
                  </option>
                ))}
              </select>
            </div>


            <div className="flex flex-col gap-y-1 text-textSecondary">
              <Label label="Note" />
              <Textarea placeholder="Add Notes" note={handleNote} notesOnEdit={batchDetails.note}/>
            </div>
          </form>

          {/*  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

          {/* Alert div */}
        
          
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
                description="Batch updated successfully!"
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
                onclick={handleEditBatch}
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

export default EditBatch;