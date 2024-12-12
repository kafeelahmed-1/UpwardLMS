import React, { useState, useEffect } from "react";
import Button from "../../components/Button/button.component";
import Label from "../../components/Label/label.component";
import Toggle from "../Toggle/toggle.component";
import { useNavigate } from "react-router-dom";

const AddAssessment = ({ onContinue, onSubmit }) => {
  const navigate = useNavigate();
  const [assessmentCategories, setAssessmentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [formData, setFormData] = useState({
    assessmentCategoryId: 1,
    title: "",
    note: "",
    registrationDate: "",
    dueDate: "",
    isPublished: false,
  });

;
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
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setFormData((prevData) => ({
      ...prevData,
      assessmentCategoryId: categoryId,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = () => {
    console.log("Toggle button clicked");
    setFormData((prevData) => ({
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
    onContinue(formData);
    console.log(formData);
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

  return (
    <div>
      <form className="form-styles">
        <div className="input-div">
          <Label label="Title" />
          <input
            type="text"
            placeholder="Title"
            className="input-styles"
            name="title"
            value={formData.title}
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
              value={formData.registrationDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-div-styles w-[232px]">
            <Label label="Due Date" />
            <input
              type="date"
              className="input-styles w-[232px]"
              name="dueDate"
              value={formData.dueDate}
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
            value={formData.note}
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
              checked={formData.isPublished}
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
            /* onclick={handleFormData} */
          />
        </div>
        {/*    <Button
          button_type="primary"
          button_size="medium"
          text="Continue"
          icon="none"
          src=""
          onclick={handleFormData}
        /> */}
      </div>
    </div>
  );
};

export default AddAssessment;
