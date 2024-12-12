import React, { useState, useEffect } from "react";
import AddAssessment from "../../components/Assessments/addAssessment.component";
import AssessmentQuestions from "./AssessmentQuestions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddNewAssessment = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [assessmentData, setAssessmentData] = useState({});
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // If the token is not present, redirect to the login page
  //   if (!token) {
  //     navigate("/"); // Redirect to your login page route
  //   }
  // }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleLink = (id) => {
    setActive(id);
  };
  const handleContinueClick = (data) => {
    console.log("child form data :", data);
    setAssessmentData(data);
    setActiveTab("question");
  };
  const handleSubmit = async (data) => {

    console.log("DATA ON POST" , data);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/AssessmentHead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit assessment data");
      }

      console.log("Assessment data successfully submitted to the backend");
    } catch (error) {
      console.error("Error submitting assessment data:", error.message);
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", marginLeft: 20, marginTop: 20 }}>
        <Link
          to="/assessment"
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
          Assessment
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
          Add New Assessment
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <h3
          style={{
            color: "#121826",
            fontWeight: 600,
            fontSize: 24,
            fontFamily: "Lato",
            margin: 0,
            marginLeft: 22,
          }}
        >
          Add New Assessment
        </h3>
        <button
          style={{
            width: 100,
            height: 28,
            padding: "3px",
            borderRadius: 56,
            border: "1px solid rgba(76, 161, 84, 0.3)",
            color: "#4CA154",
            fontWeight: 400,
            fontFamily: "Lato",
            fontSize: 14,
            position: "relative",
            left: 20,
          }}
          onClick={() => handleTabClick("basic")}
        >
          Active
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#4CA154",
              left: 18,
              top: "40%",
            }}
          ></div>
        </button>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 30,
          }}
        >
          <p
            style={{
              color: activeTab === "basic" ? "#182542" : "#6C727F",
              fontWeight: activeTab === "basic" ? 600 : 400,
              // textDecoration: activeTab === "basic" ? "underline" : null,
              fontSize: 12,
              fontFamily: "Lato",
              padding: 10,

              cursor: "pointer",
            }}
            onClick={() => handleTabClick("basic")}
          >
            Basic Information
          </p>
          <p
            style={{
              color: activeTab === "question" ? "#182542" : "#6C727F",
              fontWeight: activeTab === "question" ? 600 : 400,
              // textDecoration: activeTab === "question" ? "underline" : null,
              fontSize: 12,
              fontFamily: "Lato",
              padding: 10,
              marginLeft: 25,
              cursor: "pointer",
            }}
            onClick={() => handleTabClick("question")}
          >
            Question
          </p>
        </div>

        {activeTab === "basic" ? (
          <div
            style={{
              width: "13%",
              borderBottom: "2px solid #182542",
            }}
          ></div>
        ) : (
          <div
            style={{
              width: "8%",
              marginLeft: "12%",
              borderBottom: "2px solid #182542",
            }}
          ></div>
        )}

        <hr
          style={{
            width: "100%",
            borderTop: "1px solid #9DA3AE",
          }}
        />
      </div>

      {activeTab === "basic" ? (
        <AddAssessment
          onContinue={handleContinueClick}
          // onSubmit={handleAssessmentSubmit}
        />
      ) : (
        <AssessmentQuestions
          onSubmit={handleSubmit}
          assessmentData={assessmentData}
          title="add"
        />
      )}
    </div>
  );
};
