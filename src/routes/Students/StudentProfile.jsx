import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StudentCard from "./studentCard.component";
import { StudentAssessment } from "./StudentAssessment";
import { StudentEnrollment } from "./StudentEnrollment";

export const StudentProfile = () => {
  const [active, setActive] = useState(2);
  const [activeTab, setActiveTab] = useState("basicInformation");
  const [studentData, setStudentData] = useState(null);

  const { id } = useParams();
  // console.log("STUDENT PROFILE ID  :" , id);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/Students/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setStudentData(result.data);
        } else {
          console.error("Failed to fetch student data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleLink = (id) => {
    setActive(id);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }} className="pb-[35px]">
      <div style={{ display: "flex", marginLeft: 20, marginTop: 20}}>
        <Link
          to="/students"
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
          Candidates
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
            display: "flex",
          }}
          onClick={() => {
            handleLink(2);
          }}
        >
          Candidate's Profile
          {/* {studentData && (
            <p style={{ marginLeft: 10 }}>
              {" "}
              {studentData.studentName} <spn>F/N</spn> {studentData.fatherName}
            </p>
          )} */}
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
         {studentData ? studentData.studentName+"\'s"  + " Profile" : 'Candidate\'s Profile'}
         {/* {studentData?.studentName}'s Profile */}
        </h3>
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
              textDecoration:
                activeTab === "basicInformation" ? "underline" : null,
              fontWeight: activeTab === "basicInformation" ? "bold" : null,
              fontSize: 12,
              fontFamily: "Lato",
              padding: 10,
              cursor: "pointer",
            }}
            onClick={() => {
              handleTabClick("basicInformation");
            }}
          >
            Basic Information
          </p>

          <p
            style={{
              textDecoration: activeTab === "assessment" ? "underline" : null,
              fontWeight: activeTab === "assessment" ? "bold" : null,
              fontSize: 12,
              fontFamily: "Lato",
              padding: 10,
              marginLeft: 25,
              cursor: "pointer",
            }}
            onClick={() => {
              handleTabClick("assessment");
            }}
          >
            Assessments
          </p>

          <p
            style={{
              textDecoration: activeTab === "enrollment" ? "underline" : null,
              fontWeight: activeTab === "enrollment" ? "bold" : null,
              fontSize: 12,
              fontFamily: "Lato",
              padding: 10,
              marginLeft: 25,
              cursor: "pointer",
            }}
            onClick={() => {
              handleTabClick("enrollment");
            }}
          >
            Enrollment
          </p>
        </div>

        <hr
          style={{
            width: "100%",
            borderTop: "1px solid #9DA3AE",
          }}
        />
        <div className="tab-content">
          {activeTab === "basicInformation" && <StudentCard />}
          {activeTab === "assessment" && <StudentAssessment />}
          {activeTab === "enrollment" && <StudentEnrollment />}
        </div>
      </div>
    </div>
  );
};
