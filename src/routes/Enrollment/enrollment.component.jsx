import MainHeading from "../../components/Header/header.component";
import Aos from "aos";
import "aos/dist/aos.css";
import SearchField from "../../components/SearchField/searchField.component";
import Button from "../../components/Button/button.component";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlusBig from "../../assets/PlusBig.svg";
import FilterIcon from "../../assets/filterIcon.svg";
import EditIcon from "../../assets/editIcon.svg";
import TrashIcon from "../../assets/trash.svg";
import ArrowDown from "../../assets/arrowDown.svg";
import CloseFilter from "../../assets/closeFilter.svg";
import MiniDropdown from "../../components/SubjectDropdown/miniDropdown.component";
import AddStudent from "../../components/StudentData/addStudent.component";
import EditStudent from "../../components/StudentData/editStudent.component";
import DeleteStudent from "../../components/StudentData/deleteStudent.component";
import FileIcon from "../../assets/FileIcon.svg";
import FileNotExist from "../../assets/FileNotExist.svg";
import EyeIcon from "../../assets/eye.png";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { Loader } from "../Students/Loader";
// import StudentFilter from "../../components/StudentData/filter.component";
import EnrollmentFilter from "./enrollmentFilter.component";

const Enrollment = () => {
  const [studentData, setStudentData] = useState([]);
  // console.log("STUDENT DATA ::::" , studentData);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(2000);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchEnrollmentData();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  const [filter, setFilter] = useState(false);
  //   console.log('filter :' , filter);
  const [clearFilter, setClearFilter] = useState(false);
  // console.log("clear filter :", clearFilter);
  const [searchedTitle, setSearchedTitle] = useState("");
  // console.log('searched title from students comp :' , searchedTitle);

  const [selectedStatus, setSelectedStatus] = useState("");

  // const [displayStudentDetails, setDisplayStudentDetails] = useState(false);
  // console.log("display studeny details :" , displayStudentDetails);

  const [displayAddStudentForm, setDisplayAddStudentForm] = useState(false);
  // console.log("displayadd student form :" , displayAddStudentForm);

  const [displayEditStudentForm, setDisplayEditStudentForm] = useState(false);
  // console.log('edit student form initially');

  const [displayDeleteStudentPopup, setDisplayDeleteStudentPopup] = useState(false);
  const [isSearchBarEmpty, setIsSearchBarEmpty] = useState(true);

  const [enrollmentData , setEnrollmentData] = useState([]);
  console.log("enrollment data :0 " , enrollmentData);

  const [filteredCourse , setFilteredCourse] = useState('Select Course');
  console.log('FILTERED COURSE ::::::::::::::::::::::' , filteredCourse);

  const [filteredBatch , setFilteredBatch] = useState('Select Batch');
  console.log('FILTERED BATCH :::::::::::::::::::::::' , filteredBatch);

  


  const fetchEnrollmentData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        //`${process.env.REACT_APP_BASE_URL}/Authentication/Login`,
       `${process.env.REACT_APP_BASE_URL}/api/StudentEnrollment?pageIndex=0&pageSize=123`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const data = await response.json();
      setEnrollmentData(data.data);


      //for fetching enrollment data 
 

      // console.log(data.data);
      // setTotalCount(data.metadata.Count);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  // const pagesVisited = pageIndex * itemsPerPage;

  // const displayData = studentData.slice(
  //   pagesVisited,
  //   pagesVisited + itemsPerPage
  // );

  // Update the student data state with the filtered data for the current page

  /*   const { id } = useParams();
   */ //   console.log("id :" , id);

  const navigate = useNavigate();

  //ARRAY
  let tableHead = [
    " Student\'s Name",
    // "Father's Name",
    "Course Name",
    "Batch",
    "Attachment",
    // "Status",
    "",
  ];

  // const handleSearch = (value, keyPressed) => {
  //   if ((keyPressed === "Enter" || keyPressed === 13) && value.trim() !== "") {
  //     fetchStudentData(value);
  //     setIsSearchBarEmpty(false);
  //   } else if (keyPressed === "Backspace" && value.trim().length == 1) {
  //     setIsSearchBarEmpty(true);
  //     fetchStudentData("");
  //   } else if (keyPressed === "Enter" && value.trim() === "") {
  //     fetchStudentData("");
  //     setIsSearchBarEmpty(true);
  //   }
  // };
  const handleSearch = (value) => {
    setSearchedTitle(value);
    setPageIndex(0);
  };
  const filteredData = searchedTitle
    ? studentData.filter((student) => {
        if (
          student &&
          student.studentName &&
          student.qualification &&
          student.emailAddress &&
          student.city &&
          student.contactNumber
        ) {
          const studentName = student.studentName.toLowerCase();
          const qualification = student.qualification.toLowerCase();
          const email = student.emailAddress.toLowerCase();
          const city = student.city.toLowerCase();
          const phone = student.contactNumber.toLowerCase();
          const searched = searchedTitle.toLowerCase();

          return (
            studentName.includes(searched) ||
            qualification.includes(searched) ||
            email.includes(searched) ||
            city.includes(searched) ||
            phone.includes(searched)
          );
        }
        return false;
      })
    : studentData;
  // console.log(filteredData);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage
  );
  // console.log("paginatedData" + paginatedData);

 /*  const handleStudentInfo = () => {
    alert('student name clicked');

    setDisplayStudentDetails(true);
  }; */
/* 
  const handleCloseStudentDetails = (value) => {
    navigate("/students");
    setDisplayStudentDetails(value);
  }; */

  const handleAddStudentForm = (value) => {
    setDisplayAddStudentForm(value);
  };

  const handleEditStudentForm = (value) => {
    setDisplayEditStudentForm(value);
  };

  const handleDeleteStudent = (value) => {
    setDisplayDeleteStudentPopup(value);
  };

   //sub is passed from child comp (MINI DROPDOWN Comp) to parent comp (this comp i.e. questions comp)
   const handleSelectedStatus = (val) => {
    /* console.log('sub :' , sub); */
    setSelectedStatus(val);
  };


  const handlePageClick = ({ selected }) => {
    let currentPage = selected;
    setPageIndex(currentPage);
    // await fetchData(currentPage);
  };


  const handleClearFilter = (val) => {
    // console.log("clear filter value " , val);
    setClearFilter(val);
  }




  const handleCourseFilter = (val) => {

    // console.log("course filter val :" , val);
    setFilteredCourse(val);

    // if (clearFilter)
    // {
    //   setFilteredCourse('');
    // }

  }


  const handleBatchFilter = (val) => {

    setFilteredBatch(val);
    


  }

  //custom styles for modal
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
      padding: "0px",
    },
  };
  const handleDownload = (fileId, fileName) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/FileDocument/File/${fileId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col gap-y-4 py-10">
        <MainHeading title="Enrollment" />
        {/*  SECTION 1 */}
        <div
          className="flex justify-between"
          data-aos="fade-up"
          data-aos-duration="200"
        >
          {/* A search filed */}
          <SearchField onSearch={handleSearch} />
          {/* A filter icon */}
          <div className="flex gap-x-5">
            <img
                src={FilterIcon}
                onClick={() => {
                  setFilter(!filter);
                }}
              />
            {/* A button */}
            {/* <Link to="addStudent">
              <Button
                button_type="primary"
                button_size="medium"
                text="Add Student"
                icon="left"
                src={PlusBig}
                onclick={() => {
                  setDisplayAddStudentForm(true);
                }}
              />
            </Link> */}
          </div>
        </div>
        {/*  SECTION 1 ends here */}
     
        {/* MODAL 2 */}
        {/*This modal will be opened when add student button will be clicked */}
        <Modal
          isOpen={displayAddStudentForm}
          style={customStyles}
          height="400px"
          width="fitContent"
          ariaHideApp={false}
        >
          <AddStudent
            closeAddStudentForm={handleAddStudentForm}
            ariaHideApp={false}
            refreshStudents={fetchEnrollmentData}
          />
        </Modal>
        {/* MODAL 3 */}
        {/*This modal will be opened when edit student button will be clicked */}
        <Modal
          isOpen={displayEditStudentForm}
          style={customStyles}
          height="400px"
          width="fitContent"
          ariaHideApp={false}
        >
          <EditStudent
            closeEditStudentForm={handleEditStudentForm}
            ariaHideApp={false}
            refreshStudents={fetchEnrollmentData}
          />
        </Modal>
        {/* MODAL 4 */}
        {/*This modal will be opened when delete icon  will be clicked */}
        <Modal
          isOpen={displayDeleteStudentPopup}
          style={customStyles}
          height="400px"
          width="fitContent"
          ariaHideApp={false}
        >
          <DeleteStudent
            closeDeleteStudentPopup={handleDeleteStudent}
            ariaHideApp={false}
            refreshStudents={fetchEnrollmentData}
          />
        </Modal>
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        {/*  SECTION 2 : Filter div */}
        {/*  initially this question is hidden, it will only display if the filter icon is clicked */}
        {/* main div of this section */}
        <div
          className="py-3 px-4 bg-default rounded-lg"
          style={{ display: filter ? "block" : "none" }}
        >
          {/* then comes the sub div that contains the dropdowns and a clear filter button */}
          <div
            className="flex justify-between"
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            {/*  mini dropdown */}
            {/* <StudentFilter
              statusChange={handleSelectedStatus}
              resetFilter={clearFilter}
            /> */}
            <EnrollmentFilter resetFilter={clearFilter} onClearFilter={handleClearFilter} onCourseChange={handleCourseFilter} onBatchChange={handleBatchFilter} />

            {/*  a clear filter button wrapped in a div */}
            <div
             onClick={() => {
                setSelectedStatus('Select Status');
                setClearFilter(true);
              }}
            >
              <Button
                button_type="tertiary"
                button_size="small"
                text="Clear Filters"
                icon="left"
                src={CloseFilter}
              />
            </div>
          </div>
        </div>
        {/* SECTION 2 ends here */}
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        {/* SECTION 3 : TABLE */}
        <table
          className="border border-secondary"
          data-aos="fade-up"
          data-aos-duration="220"
        >
          <thead className="border-b border-secondary">
            <tr className="text-left bg-snowWhite">
              {tableHead.map((headings, i) => (
                 <td
                 className="py-3 px-2 text-sm text-textPrimary font-semibold"
                 key={i}
               >
                 <div className="flex gap-x-2">
                   <p> {headings}</p>
                   {headings != "" ? ( <img src={ArrowDown} />) : ("")}
                 </div>
               </td>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={tableHead.length} className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : (
                enrollmentData?.filter((item) => {
                    return ((searchedTitle == ""
                      ? item
                      : item.studentDetail.studentName
                        .toLowerCase()
                        .includes(searchedTitle.toLowerCase()))) &&

                        // item.assessmentTitle
                        // .toLowerCase()
                        // .includes(searchedTitle.toLowerCase())) &&

                        (filteredCourse === "Select Course"
                          ? item
                          : item.courseDetail.courseTitle.includes(filteredCourse)) &&


                        (filteredBatch === "Select Batch"
                          ? item
                          : item.batchDetail.batchTitle.includes(filteredBatch));

              })
              .map((item, i) => (
                <tr
                  key={i}
                  className="text-sm text-sm text-textPrimary font-normal"
                  style={{
                    backgroundColor: i % 2 == 0 ? "transparent" : "#F3F4F6",
                  }}
                >
                  <td className="p-1">{item.studentDetail?.studentName}</td>
                  <td className="p-1">{item.courseDetail?.courseTitle}</td>
                  <td className="p-1">{item.batchDetail?.batchTitle}</td>
                  {/* <td className="p-1">{item.assessmentTitle}</td>
                  <td className="p-1">{item.assessmentDate?item.assessmentDate.substring(0,10):item.assessmentDate}</td> */}
                  <td className="p-2">
                    {item.resumeDocumentId ? (
                      <button
                        onClick={() =>
                          handleDownload(
                            item.resumeDocumentId,
                            item.resumeDocumentDetail.sourceFileName
                          )
                        }
                      >
                        <img src={FileIcon} alt="File Icon" />
                      </button>
                    ) : (
                      <img src={FileNotExist} alt="File Not Exist Icon" />
                    )}
                  </td>
                  <td>
                    <Link to={`/studentProfile/${item.studentDetail?.id}`} className="text-blue-500 semibold">
                      <img src={EyeIcon} className="w-6 h-6" alt="viewStudentDetails" />
                    </Link>
                    {/* <Link to={`editStudent/${item.id}`}>
                      <img
                        src={EditIcon}
                        onClick={handleEditStudentForm}
                        alt="Edit Icon"
                        className="p-2"
                      />
                    </Link>
                    <Link to={`deleteStudent/${item.id}`}>
                      <img
                        src={TrashIcon}
                        onClick={() => setDisplayDeleteStudentPopup(true)}
                        alt="Trash Icon"
                        className="p-2"
                      />
                    </Link> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>{" "}
        {/* SECTION 3 ends here */}
        {/* <div className="pagination-container">
            <button
              onClick={prevPage}
              disabled={pageIndex === 0}
              className="pagination-btn"
            >
              &lt; Previous
            </button>
            <span className="pagination-number">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPageIndex(index)}
                  className={`pagination-btn ${
                    pageIndex === index && "active"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </span>
            <button
              onClick={nextPage}
              disabled={pageIndex === totalPages - 1}
              className="pagination-btn"
            >
              Next &gt;
            </button>
          </div> */}
        {paginatedData.length >= 19 && (
          <ReactPaginate
            breakLabel="..."
            pageCount={pageCount}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination-container"}
            pageClassName={"pagination__item"}
            pageLinkClassName={"pagination__link"}
            activeLinkClassName={"active"}
            previousClassName={"pagination-btn"}
            nextClassName={"pagination-btn"}
            previousLabel={
              <button className="pagination__button">Previous</button>
            }
            nextLabel={<button className="pagination__button">Next</button>}
            disabledClassName={"pagination__disabled"}
          />
        )}
      </div>
    </div>
  );
};

export default Enrollment;
