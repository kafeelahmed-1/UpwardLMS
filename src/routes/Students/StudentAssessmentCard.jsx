import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/button.component";
import Label from "../../components/Label/label.component";
import ConfirmationDialog from "../Students/ConfirmationDialog";
export const StudentAssessmentCard = () => {
  const [assessmentData, setAssessmentData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFormData = () => {
    navigate(`/userAssessment/${id}`);
  };
  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };
  const handleLink = (id) => {
    setActive(id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/AssessmentHead/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAssessmentData(data.data);
      })
      .catch((error) =>
        console.error("Error fetching assessment data:", error.message)
      );
  }, []);

  return (
    <>
      <hr></hr>

      <div style={{ position: "relative", margin: 25 }}>
        <div style={{ display: "flex", marginLeft: 20 }}>
          <Link
            to="/studentDashBoard"
            style={{
              color: active === 1 ? "#121826" : "#9DA3AE",
              textDecoration: active === 1 ? "underline" : "none",
              fontWeight: 600,
              fontSize: 12,
            }}
            onClick={() => {
              handleLink(1);
            }}
          >
            DashBoard
          </Link>
          <span style={{ fontWeight: 600, fontSize: 12, paddingLeft: 10 }}>
            {" "}
            /
          </span>
          <Link
            style={{
              color: active === 2 ? "#121826" : "#9DA3AE",
              textDecoration: active === 2 ? "underline" : "none",
              fontWeight: 600,
              fontSize: 12,
              paddingLeft: 10,
            }}
            onClick={() => {
              handleLink(2);
            }}
          >
            AssessmentDetail
          </Link>
        </div>
        <h3
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#121826",
            marginLeft: 20,
          }}
        >
          Assessment Details
        </h3>
        <form className="form-styles">
          <div className="input-div">
            <Label label="Title" />
            <input
              readOnly={true}
              type="text"
              placeholder="Title"
              className="input-styles"
              style={{ backgroundColor: "#F3F4F6", color: "#121826" }}
              name="title"
              value={assessmentData.title}
              // onChange={handleInputChange}
            />
          </div>
          {assessmentData.assessmentCategoryDetail ? (
            <div className="input-div-styles">
              <Label label="Assessment Category" />
              <input
                readOnly={true}
                type="text"
                className="input-styles"
                style={{ backgroundColor: "#F3F4F6", color: "#121826" }}
                name="assessmentCategory"
                value={assessmentData.assessmentCategoryDetail.title}
                // onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="input-div-styles">
              <Label label="Assessment Category" />
              <input
                readOnly={true}
                type="text"
                className="input-styles"
                style={{ backgroundColor: "#F3F4F6", color: "#121826" }}
                name="assessmentCategory"
                value="assessmentCategoryLoading"
                // onChange={handleInputChange}
              />
            </div>
          )}

          <div className="flex gap-x-4">
            {/* <div className="input-div-styles w-[232px]">
            <Label label="Reg Date" />
            <input
              type="date"
              className="input-styles w-[232px]"
              name="registrationDate"
              // value={formData.registrationDate}
              // onChange={handleInputChange}
            />
          </div> */}
            {assessmentData.dueDate ? (
              <div className="input-div-styles w-[232px]">
                <Label label="Due Date" />
                <input
                  readOnly={true}
                  type="text"
                  className="input-styles w-[232px]"
                  style={{ backgroundColor: "#F3F4F6", color: "#121826" }}
                  name="dueDate"
                  value={assessmentData.dueDate.substring(0, 10)}
                  // onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className="input-div-styles w-[232px]">
                <Label label="Due Date" />
                <input
                  readOnly={true}
                  type="text"
                  className="input-styles w-[232px]"
                  style={{ backgroundColor: "#F3F4F6", color: "#121826" }}
                  name="dueDate"
                  // value={assessmentData.dueDate.substring(0, 10)}
                  // onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div className="input-div-styles w-[480px] h-[120px]">
            <Label label="Note" />
            <textarea
              readOnly={true}
              className="textarea-styles"
              placeholder="Write your notes here"
              rows="5"
              name="note"
              style={{ backgroundColor: "#F3F4F6", color: "#121826" }}
              value={assessmentData.note}
              // onChange={handleInputChange}
            />
            {/* Character counter */}
            <div className="flex justify-between mt-2">
              {/* <span>{noteLength}/250</span> */}
            </div>
          </div>

          <div>
            {/* <span style={{ fontSize: 12, fontWeight: 600, color: "#6C727F" }}>
            Status
          </span> */}
            {/* <div
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
          </div> */}
          </div>
        </form>
        <div className="w-[520px]  flex justify-end">
          <div>
            <Button
              button_type="primary"
              button_size="medium"
              text="Start Assessment"
              icon="none"
              src=""
              onclick={handleShowConfirmation}
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
        {showConfirmation && (
          <ConfirmationDialog
            message="Are you ready to start the assessment?"
            onConfirm={handleFormData}
            onCancel={handleCloseConfirmation}
          />
        )}
      </div>
    </>
  );
};
