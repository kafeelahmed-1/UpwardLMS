import FormTitle from "../FormTitle/formTitle.component";
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import Alert from "../Alert/alert.component";
import CheckIconBig from "../../assets/checkIconBig.svg";
import {useParams} from 'react-router-dom';
import {useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";


const EditCategory = ({ closeModal , refreshData }) => {


    refreshData();

    //HOOKS
    const {id} = useParams();
    console.log("edit categor id is :" , id);

    const [categoryTitle , setCategoryTitle] = useState('');
    console.log("category title :" , categoryTitle);

    const [success , setSuccess] = useState(false);
    const [error , setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_BASE_URL}/api/MarksCategory/${id}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).
      then((response) => response.json()).
      then((data) => setCategoryTitle(data.data.marksTitle))

    } , []);



    //FUNCTIONS
    const onClose = () => {

      closeModal(false);
      navigate("/marksCategories");
  
    }


    const handleCancel = () => {
        closeModal(false);
        navigate("/marksCategories");
    }


    const handleCategoryTitle = (e) => {
       
        setCategoryTitle(e.target.value);
    }


    const handleEditCategory = () => {
      

      if (categoryTitle == ""){
        setError(true);
        setSuccess(false);
      }

      else{
        const token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_BASE_URL}/api/MarksCategory/${id}`, {
          method: "PUT",
          body:JSON.stringify({id:id, marksTitle:categoryTitle}),
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
          //   alert("CATEGORY UPDATED SUCCESSFULLY");
          //   navigate("/marksCategories");
          //   onEditCategory(false);
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
        <FormTitle title="Edit Category" formClosed={onClose} />

        {/*  actual form */}
        <form className="pt-3 px-5 pb-8 flex flex-col gap-y-4 w-[520px] h-[fit-content]">
          {/* CATEGORY TITLE DIV */}
          <div className="input-div-styles">
            <Label label="Category Title" />
            <input
              type="text"
              placeholder="Category Title"
              className="input-styles"
              value={categoryTitle}
              onChange={handleCategoryTitle}
            />
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
                description="Category updated successfully!"
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
              onclick={handleEditCategory}
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

export default EditCategory;
