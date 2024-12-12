import FormTitle from "../FormTitle/formTitle.component";
import Button from "../Button/button.component";
import WhiteTrashIcon from "../../assets/whiteTrashIcon.svg";
import { useParams , useNavigate } from "react-router-dom";



const DeleteCategory = ({ closeModal , onDelSuccess , refreshData}) => {


     refreshData();
     
    //HOOKS

    const {id} = useParams();
    // console.log("id delete :" , id);
    const navigate = useNavigate();


    //FUNCTIONS
    const onClose = () => {
        closeModal(false);
        navigate("/marksCategories");
    }

    const handleCancel = () => {
        closeModal(false);
        navigate("/marksCategories");
    }


    const handleDelCourse = () => {

    //   console.log("on del course");
      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_BASE_URL}/api/marksCategory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        /* No need to pass quesData in the body for deletion */
      })
        .then((response) => response.json())
        .then((response) => {
          //  console.log("DEL RESPONSE :" , response);
           if (response.success)
            {
              onDelSuccess(response.success);
              setTimeout(() => {

                navigate("/marksCategories");

              } , 4000)
              // closeModal(false);
              // alert("CATEGORY DELETED SUCCESSFULLY!!");
              // navigate("/marksCategories");
              // onDelCategory(false);
            }
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
        });

        // refreshData();
    }

    const customStyles = {
      overlay: {
        background: "rgb(0, 0, 0, 0.4)",
      },
      content: {
        width: "fit-content",
        /* height:'fit-content', */
        marginLeft: "auto",
        marginRight: "auto",
        background: "transparent",
        border: "none",
        padding: "0px 1px 0px 0px",
      },
    };
  



    return(
        <>

        <div className="border border-secondary w-[520px] min-h-[252px] h-[fit-content] rounded-lg mx-auto bg-white">
          {/* div 1 : FORM TITLE*/}
          <FormTitle title="Delete Category?" formClosed={onClose}/>
  
          {/* div 2 : CONTENT BODY */}
          <div className="flex flex-col gap-y-6 pt-3 px-5 pb-8 text-base">
            <p>This question is currently assigned to 15 assessments. Deleting it would remove this question from the aassessments</p>
            <p>This action is irreversible.</p>
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
                text="Delete Category"
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


export default DeleteCategory;