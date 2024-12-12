import FormTitle from "../FormTitle/formTitle.component";
import Button from "../Button/button.component";
import WhiteTrashIcon from "../../assets/whiteTrashIcon.svg";
import { useParams , useNavigate } from "react-router-dom";


const DelCourse = ({closeModal , onDelSuccess , refreshData}) => {

    refreshData();

    const {id} = useParams();
    // console.log("id delete :" , id);

    const navigate = useNavigate();


    const onClose = () => {

        closeModal(false);
        navigate("/courses")

    }

    const handleCancel = () => {

       closeModal(false);
       navigate("/courses")

    }


    const handleDelCourse = () => {

      console.log("on del course");

      const token = localStorage.getItem("token");

      fetch(`${process.env.REACT_APP_BASE_URL}/api/Course/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        /* No need to pass quesData in the body for deletion */
      })
        .then((response) => response.json())
        .then((response) => {
           console.log("DEL RESPONSE :" , response);
           if (response.success)
            {
              onDelSuccess(response.success);
              setTimeout(() => {

                navigate("/courses");

              } , 4000)
              // navigate("/courses");
              // onDelCourse(false);
            }
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
        });

        // refreshData();
    }


    return(
        <>
        <div className="border border-secondary w-[520px] min-h-[252px] h-[fit-content] rounded-lg mx-auto bg-white">
          {/* div 1 : FORM TITLE*/}
          <FormTitle title="Delete Course?" formClosed={onClose}/>
  
          {/* div 2 : CONTENT BODY */}
          <div className="flex flex-col gap-y-6 pt-3 px-5 pb-8 text-base">
            <p>This question is currently assigned to 15 assessments. Deleting it would remove this question from the aassessments</p>
            <p>This action is irreversible.</p>
           {/*  <div className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-secondary"
              />
              <label>Don't Ask again</label>
            </div> */}
          </div>
  
          {/*  DIV 3 : BUTTONS DIV */}
          <div className="w-[520px] h-[84px] p-5 flex justify-end">
            <div className="flex gap-x-4">
              {/* Button comp : cancel button*/}
              <Button
                button_type="tertiary"
                button_size="medium"
                text="Cancel"
                onclick={handleCancel} 
                icon="none"
                src=""
              />
              {/* Button comp : Add more questions div */}
              <Button
                button_type="delete"
                button_size="medium"
                text="Delete Course"
                onclick={handleDelCourse}
                icon="left"
                src={WhiteTrashIcon}
              />
            </div>
          </div>
  
        </div>
      </>
    );
}

export default DelCourse;