import MainHeading from "../../components/Header/header.component";
import SearchField from "../../components/SearchField/searchField.component";
import Button from "../../components/Button/button.component";
import SelectStudents from "./selectStudents.component";
import PlusBig from "../../assets/PlusBig.svg";
import FilterIcon from "../../assets/filterIcon.svg";
import FileIcon from "../../assets/FileIcon.svg";
import FileNotExist from "../../assets/FileNotExist.svg";
import ArrowDown from "../../assets/arrowDown.svg";
import EditIcon from "../../assets/editIcon.svg";
import TrashIcon from "../../assets/trash.svg";
import { Link } from "react-router-dom";
import {useState , useEffect} from 'react';
import Modal from 'react-modal';

const AssignAssessment  = () =>
{
    //ARRAY
    let tableHead = [
      "Name",
      // "Father's Name",
      "Phone",
      "Email",
      "Qualification",
      "City",
      // "Status",
      "Actions",
      "Attachment"
    ];

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
  

    const [studentData , setStudentData] = useState([]);
    // console.log("STUDENT DATA :" , studentData);

    const [search , setSearch] = useState('');
    // console.log("search is :" , search);

    const [selectStudentsModal , setSelectStudentsModal] = useState(false);

    // const [filteredStudents , setFilteredStudents] = useState();
    // console.log("filtered students GET :" , filteredStudents);
    

    useEffect(() => {
      const token = localStorage.getItem("token");
      // console.log('TOKEN :' , token);

      fetch(`${process.env.REACT_APP_BASE_URL}/api/Student?pageIndex=0&pageSize=2000`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => setStudentData(data.data))
      .catch((error) => console.error("Error:", error));
      

      fetch(`${process.env.REACT_APP_BASE_URL}/api/assessment/1036/students`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => console.log('assessment assigned to students GET METHOD data', data.data))
      .catch((error) => console.log("ERROR : " , error));

    } , []);

    const handleSearch = (value) => {
      console.log("value is :" , value);
      setSearch(value);
    }

    const handleStudentsModal = (value) => 
    {
      console.log("SELECT STUDENTS MODAL :" , value);
      setSelectStudentsModal(value);
    }


    // console.log("YOOOOOO");
    return(
        <>
        <div className="flex flex-col gap-y-4 py-10">
        <MainHeading title="Assign Assessment" />

        {/*  SECTION 1 */}
        <div
          className="flex justify-between"
          data-aos="fade-up"
          data-aos-duration="200"
        >
          {/* A search filed */}
          <SearchField onSearch={handleSearch} />
      
          {/* A filter icon */}
          <div className="flex gap-x-4">
            <img
              src={FilterIcon}
              // onClick={() => {
              //   setFilter(!filter);
              // }}
            />
            {/* A button */}
            {/* <Link to="addQuestion"> */}
              <Button
                button_type="primary"
                button_size="medium"
                text="Assign Assessment"
                icon="left"
                src={PlusBig}
                onclick={() => {
                  setSelectStudentsModal(true);
                }}
              />
            {/* </Link> */}
          </div>
        </div>
        {/*  SECTION 1 ends here */}

          {/* A modal that opens Add Question Form when add Question button is clicked */}
          <Modal
            isOpen={selectStudentsModal}
            style={customStyles}
            height="400px"
            width="fitContent"
            ariaHideApp={false}
          >
            {/* <AddQues
              displayModalValue={handleCloseModal}
              ariaHideApp={false}
              refreshStudents={fetchQuestionsData}
            /> */}
            <SelectStudents closeModal={handleStudentsModal} />
          </Modal>

        <p style={{display:selectStudentsModal ? 'block' : 'none'}}>yooo</p>

        <table
          className="border border-secondary"
          data-aos="fade-up"
          data-aos-duration="220"
        >
          <thead className="border-b border-secondary">
            <tr className="text-left bg-snowWhite">
              {tableHead.map((headings, i) => (
                <th
                  key={i}
                  className="py-3 px-2 text-sm text-textPrimary font-semibold"
                >
                  <div className="flex gap-x-2">
                    <p>{headings}</p>
                    <img src={ArrowDown} alt="Arrow Down" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {studentData.filter((item) => {
              return search.toLowerCase() == "" ? item : item.name;
                  
              }).map((item , i) => {
              return(
                <>
                  <tr    
                    className="text-sm text-sm text-textPrimary font-normal"
                    style={{
                      backgroundColor: i % 2 == 0 ? "transparent" : "#F3F4F6",
                    }}
                    key={i}
                  >      
                  <td className="p-1">
                    <Link to={`details/${item.id}`} className="student-link">
                      <span className="link-text" /*  onClick={handleStudentInfo} */>
                        {item.studentName}
                      </span>
                    </Link>
                  </td>
                  <td className="p-1">{item.contactNumber}</td>
                  <td className="p-1">{item.emailAddress}</td>
                  <td className="p-1">{item.qualification}</td>
                  <td className="p-1">{item.city}</td>
                  <td className="flex">
                    <Link to={`editStudent/${item.id}`}>
                      <img
                        src={EditIcon}
                        // onClick={handleEditStudentForm}
                        alt="Edit Icon"
                        className="p-2"
                      />
                    </Link>
                    <Link to={`deleteStudent/${item.id}`}>
                      <img
                        src={TrashIcon}
                        // onClick={() => setDisplayDeleteStudentPopup(true)}
                        alt="Trash Icon"
                        className="p-2"
                      />
                    </Link>
                  </td>
                  <td className="p-2">
                    {item.resumeDocumentId ? (
                      <button
                        // onClick={() =>
                        //   handleDownload(
                        //     item.resumeDocumentId,
                        //     item.resumeDocumentDetail.sourceFileName
                        //   )
                        // }
                      >
                        <img src={FileIcon} alt="File Icon" />
                      </button>
                     ) : (
                      <img src={FileNotExist} alt="File Not Exist Icon" />
                     )
                    }
                  </td>
                </tr>
                </>
              );
            })}
            
              
          </tbody>
        </table>{" "}

        </div>

        
        </>
    );
}

export default AssignAssessment;
