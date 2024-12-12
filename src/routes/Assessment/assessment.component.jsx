import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchField from "../../components/SearchField/searchField.component";
import Button from "../../components/Button/button.component";
import FilterIcon from "../../assets/filterIcon.svg";
import PlusBig from "../../assets/PlusBig.svg";
import seenIcon from "../../assets/seenIcon.svg";
import ThreeDots from "../../assets/threeDots.svg";
import RedDeleteIcon from "../../assets/redDeleteIcon.svg";
import EditIcon from "../../assets/editIcon.svg";
import AssignAssessmentIcon from "../../assets/assignAssessmentIcon.svg";
import Chips from "../../components/Chips/chips.component";

const Assessment = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

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
        setFilteredData(data.data);
      })
      .catch((error) =>
        console.error("Error fetching assessment data:", error.message)
      );
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered = assessmentData.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // Handle filter by title
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterTitle(value);
    const filtered = assessmentData.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <>
      {/* ASSESSMENT CONTAINER */}
      <div className="flex flex-col gap-y-4 py-10">
        <h2 className="text-2xl ml-4">Assessments</h2>

        {/* Section 1: SEARCH FIELD, FILTER, AND BUTTON */}
        <div className="flex justify-between items-center">
          {/* Search Field */}
          <input
            type="text"
            placeholder="Search Assessments..."
            value={searchInput}
            onChange={handleSearch}
            className="border rounded px-4 py-2"
          />

          {/* Filter and Add Assessment Button */}
          <div className="flex gap-x-4 items-center">
            <img
              src={FilterIcon}
              onClick={toggleFilter}
              className="cursor-pointer"
              alt="Filter Icon"
            />
            {filterVisible && (
              <input
                type="text"
                placeholder="Filter by Title"
                value={filterTitle}
                onChange={handleFilter}
                className="border rounded px-4 py-2"
              />
            )}
            <Link to="/addNewAssessment">
              <Button
                button_type="primary"
                button_size="medium"
                text="Add Assessment"
                icon="left"
                src={PlusBig}
              />
            </Link>
          </div>
        </div>

        {/* Section 2: ASSESSMENT CARDS */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-[10px]">
          {filteredData.map((assessment) => (
            <div key={assessment.id}>
              {/* Main Container */}
              <div className="border border-secondary rounded-lg px-4 pt-4 pb-6 w-full max-w-sm h-auto flex flex-col gap-y-2 sm:max-w-md md:max-w-lg">
                {/* Sub Div 1 */}
                <div className="flex justify-between flex-wrap sm:flex-nowrap">
                  <div className="flex gap-x-2">
                    <Chips
                      text={assessment.assessmentCategoryDetail.title}
                      size="large"
                    />
                    <div className="self-center">
                      <img src={seenIcon} alt="Seen Icon" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div onClick={(e) => e.stopPropagation()}>
                      <Link to={`/assessment/actions/${assessment.id}`}>
                        <img src={ThreeDots} className="p-1" alt="Options" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sub Div 2 */}
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
                  <p style={{ color: "#6C727F", fontSize: 14, fontWeight: 600 }}>
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
                  <p style={{ color: "#6C727F", fontSize: 14, fontWeight: 600 }}>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Assessment;
