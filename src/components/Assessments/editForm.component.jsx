import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from "../Button/button.component";
import Label from "../Label/label.component";
import Toggle from "../Toggle/toggle.component";
import { useNavigate } from "react-router-dom";


const Edit = ({ onContinue, onSubmit , id}) => {

    // console.log("edit firm dara ::" , data);

    // const {id_} = useParams();
    // const navigate = useNavigate();
    const [assessmentCategories, setAssessmentCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [editAssessmentData, setEditAssessmentData] = useState({});
  
    // console.log("edit assessment NEW data ::::::::::::::::::" , editAssessmentData);
  // ;
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      fetch(
        `${process.env.REACT_APP_BASE_URL}/api/AssessmentCategory?pageIndex=0&pageSize=100`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setAssessmentCategories(data.data);
          setSelectedCategory(data[0]?.id || "");
        })
        .catch((error) =>
          console.error("Error fetching assessment categories:", error)
        );



        fetch(`${process.env.REACT_APP_BASE_URL}/api/AssessmentHead/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
         ).
         then((response) => response.json()).
         then((data) => {
     
           const regDate = new Date(data.data.registrationDate);
           const formattedRegDate = `${regDate.getFullYear()}-${String(
           regDate.getMonth() + 1
          ).padStart(2, "0")}-${String(regDate.getDate()).padStart(2, "0")}`;
          //formatting batch's end date
          const dueDate = new Date(data.data.dueDate);
          const formattedDueDate = `${dueDate.getFullYear()}-${String(
          dueDate.getMonth() + 1
         ).padStart(2, "0")}-${String(dueDate.getDate()).padStart(2, "0")}`;
     
           setEditAssessmentData({...data.data , registrationDate:formattedRegDate , dueDate:formattedDueDate})
         })
     

       
    }, []);
  
    const handleCategoryChange = (event) => {
      const categoryId = event.target.value;
      setSelectedCategory(categoryId);
      setEditAssessmentData((prevData) => ({
        ...prevData,
        assessmentCategoryId: categoryId,
      }));
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditAssessmentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleToggleChange = () => {
      console.log("Toggle button clicked");
      setEditAssessmentData((prevData) => ({
        ...prevData,
        isPublished: !prevData.isPublished,
      }));
    };
    // const handleFormSubmit = (e) => {
    //   e.preventDefault();
    //   onSubmit(formData);
    //   console.log("form data is clicked");
    // };
  
    const handleFormData = (e) => {
      e.preventDefault();
      onContinue(editAssessmentData);
      // console.log(formData);
    };
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   fetch("http://localhost:7372/api/AssessmentHead", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Assessment head created successfully:", data);
    //     })
    //     .catch((error) =>
    //       console.error("Error creating assessment head:", error)
    //     );
    // };

    
    return(
        <>

        <div>
        <form className="form-styles">
          <div className="input-div">
            <Label label="Title" />
            <input
              type="text"
              placeholder="Title"
              className="input-styles"
              name="title"
              value={editAssessmentData?.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-div-styles">
            <Label label="Assessment Category" />
            <select
              className="input-styles"
              value={selectedCategory}
              onChange={handleCategoryChange}
              name="assessmentCategoryId"
            >
              {assessmentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-x-4">
            <div className="input-div-styles w-[232px]">
              <Label label="Reg Date" />
              <input
                type="date"
                className="input-styles w-[232px]"
                name="registrationDate"
                value={editAssessmentData?.registrationDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-div-styles w-[232px]">
              <Label label="Due Date" />
              <input
                type="date"
                className="input-styles w-[232px]"
                name="dueDate"
                value={editAssessmentData?.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-div-styles w-[480px] h-[120px]">
            <Label label="Note" />
            <textarea
              className="textarea-styles"
              placeholder="Write your notes here"
              rows="5"
              name="note"
              value={editAssessmentData?.note}
              onChange={handleInputChange}
            />
            {/* Character counter */}
            <div className="flex justify-between mt-2">
              {/* <span>{noteLength}/250</span> */}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6C727F" }}>
              Status
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Toggle
                name="isPublished"
                type="checkbox"
                checked={editAssessmentData?.isPublished}
                onChange={handleToggleChange}
              />
              <span
                style={{
                  color: "#121826",
                  fontSize: 14,
                  fontWeight: 400,
                  paddingLeft: 10,
                }}
              >
                Published
              </span>
            </div>
          </div>

        </form>

        
        <div className="w-[520px] h-[60px]  flex justify-end">
          <div onClick={handleFormData}>
            <Button
              button_type="primary"
              button_size="medium"
              text="Continue"
              icon="none"
              src=""
              onclick={handleFormData}
            />
          </div>
        </div>
    </div>
        </>
    );
}


export default Edit;