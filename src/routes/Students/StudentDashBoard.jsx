import SearchField from "../../components/SearchField/searchField.component";
// import AddAssessment from "../../components/Assessments/addAssessment.component";
import Chips from "../../components/Chips/chips.component";
// import Button from "../../components/Button/button.component";
// import FilterIcon from "../../assets/filterIcon.svg";
// import PlusBig from "../../assets/PlusBig.svg";

import ThreeDots from "../../assets/threeDots.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StudentDashBoard = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/AssessmentHead?pageIndex=0&pageSize=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAssessmentData(data.data);
        console.log("AssessmentHead", data.data);
      })
      .catch((error) =>
        console.error("Error fetching assessment data:", error.message)
      );
  }, []);

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
  const handleSearch = (event) => {
    setSearch(event);
  };

  return (
    <>
      <div className="flex flex-col gap-y-4 py-10">
        <h2 className="text-2xl ml-4">Student DashBoard</h2>
        {/*  section 1 */}
        <div className="flex justify-between">
          <SearchField onSearch={handleSearch} />
          {/* <div className="flex gap-x-4">
            <img
              src={FilterIcon} 
            />
            <Link to="/addNewAssessment">
              <Button
                button_type="primary"
                button_size="medium"
                text="Add Assessment"
                icon="left"
                src={PlusBig}
              />
            </Link>
          </div> */}
        </div>

        {/* section 2*/}
        <div className="grid grid-cols-3 gap-3 ml-4">
          {assessmentData.map((assessment) => (
            <Link
              to={`/studentAssessmentCard/${assessment.id}`}
              key={assessment.id}
            >
              <div className="border border-secondary rounded-lg px-3 pt-3 pb-6 w-[340px] h-[152px] flex flex-col gap-y-2">
                {/* div for options */}
                <div className="flex justify-between ">
                  {/* CHIPS */}
                  <div className="flex gap-x-2">
                    <Chips
                      text={assessment.assessmentCategoryDetail.title}
                      size="large"
                    />
                    {/* {assessment.isPublished ? (
                      <div className="self-center">
                        <img src={eyeIcon} style={{ width: 20, height: 21 }} />
                      </div>
                    ) : (
                      <div className="self-center">
                        <img src={seenIcon} />
                      </div>
                    )} */}
                  </div>
                  {/*  THREE() DOTS */}
                  <Link to={`/assessments/deleteAssessment/${assessment.id}`}>
                    <div className="self-center">
                      <img src={ThreeDots} />
                    </div>
                  </Link>
                </div>

                {/* div for assessment title */}
                <div>
                  <h5
                    style={{
                      color: "#121826",
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "Lato",
                    }}
                  >
                    {assessment.title}
                  </h5>
                </div>
                <div>
                  <p
                    style={{ color: "#6C727F", fontSize: 14, fontWeight: 600 }}
                  >
                    Registration Date:{" "}
                    <span
                      style={{
                        color: "#121826",
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {assessment.registrationDate.substring(0, 10)}
                    </span>
                  </p>
                </div>
                <div>
                  <p
                    style={{ color: "#6C727F", fontSize: 14, fontWeight: 600 }}
                  >
                    Due Date:{" "}
                    <span
                      style={{
                        color: "#121826",
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {assessment.dueDate.substring(0, 10)}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentDashBoard;
