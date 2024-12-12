import FormTitle from "../FormTitle/formTitle.component";
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import PlusBig from "../../assets/PlusBig.svg";
import Alert from "../Alert/alert.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddCategory = ({ closeModal , refreshData}) => {


  refreshData();

  //HOOKS
  //use state hook
  const [categoryTitle, setCategoryTitle] = useState("");
  console.log("category title is :", categoryTitle);

  const [success , setSuccess] = useState(false);
  const [error , setError] = useState(false);

  //use navigate hook
  const navigate = useNavigate();


  //FUNCTIONS
  //on closing the form by clicking the cross icon on the top right corner will trigger this function.
  const onClose = () => {
    closeModal(false);
    navigate("/marksCategories");
  };

  //when user starts typing in the category title field, this function will be triggered
  const handleCategoryTitle = (e) => {
    setCategoryTitle(e.target.value);
  };


  //on clicking cancel button
  const handleCancel = () => {
    onClose(false);
  };


  //on clicking Add Category button
  const handleAddCategory = () => {


    if (categoryTitle == "")
    {
       console.log("enter marks category");
       setError(true);
       setSuccess(false);
    }

    else{
      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_BASE_URL}/api/MarksCatgeory`, {
        method: "POST",
        body: JSON.stringify({ marksTitle: categoryTitle }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
  
          setSuccess(data.success);
          // console.log(data.success);
          // if (data.success == true) {
          //   alert("CATEGORY ADDED SUCCESSFULLY");
          //   navigate("/marksCategories");
          //   onAddCategory(false);
          // }
        })
      .catch((err) => console.log("ERROR POST METHOD :", err.message));

      setError(false);
    
    }

  };


  return (
    <>
      {/* FORM DIV */}
      <div className="w-[520.5px] h-[fit-content] rounded-lg border border-secondary mx-auto bg-white">
        {/* form title comp */}
        <FormTitle title="Add Marks Category" formClosed={onClose} />

        {/*actual form */}
        <form className="pt-3 px-5 pb-8 flex flex-col gap-y-4 w-[520px] h-[fit-content]">
          {/* category title DIV */}
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
              description="Marks Category added successfully!"
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
        <div className="w-[520px] h-[84px] p-5 flex justify-end">
          <div className="flex gap-x-4">
            {/*Button comp */}
            {/* cancel button */}
            <Button
              button_type="tertiary"
              button_size="medium"
              text="Cancel"
              onclick={handleCancel}
              icon="none"
              src=""
            />
            {/* add category button */}
            <Button
              button_type="primary"
              button_size="medium"
              text="Add Category"
              onclick={handleAddCategory}
              icon="left"
              src={PlusBig}
            />
          </div>
        </div>

        {/*   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      </div>
    </>
  );
};

export default AddCategory;
