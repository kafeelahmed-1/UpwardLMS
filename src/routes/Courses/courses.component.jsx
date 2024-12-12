import { useEffect , useState } from "react";
import Modal from 'react-modal';
import MainHeading from "../../components/Header/header.component";
import SearchField from "../../components/SearchField/searchField.component";
import Button from "../../components/Button/button.component";
import AddCourse from "../../components/CoursesCRUD/addCourse.component";
import EditCourse from "../../components/CoursesCRUD/editCourse.component";
import DelCourse from "../../components/CoursesCRUD/deleteCourse.component";
import DelSuccess from "../../components/DeleteSuccessPopup/delSuccess.component";
// import {Link} from 'react-router-dom';
// import FilterIcon from "../../assets/filterIcon.svg";
import PlusBig from "../../assets/PlusBig.svg";
import ArrowDown from "../../assets/arrowDown.svg";
import EditIcon from "../../assets/editIcon.svg";
import TrashIcon from "../../assets/trash.svg";
import {Link} from 'react-router-dom';

const Courses = () => {
  
    //HOOKS
    //useState hooks
    const [courses , setCourses] = useState([]);
    // console.log("courses array :" , courses);
    
    const [displayAddCoursesModal , setDisplayAddCoursesModal] = useState(false);
    // console.log("displat add courses modal :" , displayAddCoursesModal);

    const [displayEditCoursesModal , setDisplayEditCoursesModal] = useState(false);
    // console.log("display edit courses modal :" , displayEditCoursesModal);

    const [displayDelCoursesModal , setDisplayDelCoursesModal] = useState(false);
    // console.log("del courses modal :" , displayDelCoursesModal);

    const [deleteSuccess , setDeleteSuccess] = useState(false);


    const [search , setSearch] = useState('');
    // console.log("SEARCH from courses:" , search);

    let tableHead = ["Course Title" , "Note" , ""];

    //useEffect hook
    useEffect(() => {

        handleAllData();
        
    } , []);



    //FUNCTIONS


    const handleAllData = () => {
      
      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_BASE_URL}/api/Course?pageIndex=0&pageSize=123`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).
      then((response) => response.json()).
      then((data) => setCourses(data.data))
    }
    //triggered on closing modal
    const handleAddCourseModal = (value) => {
      // console.log("value from child comp is :" , value);
      setDisplayAddCoursesModal(value);

    }

    //triggered when add course modal will be opened
    // const handleAddCourse = (value) => {
    //   setDisplayAddCoursesModal(value);
    // }

    const handleEditCourseModal = (value) => {
      setDisplayEditCoursesModal(value);
    }

    // const handleCloseEditCourseModal = (value) => {

    //   setDisplayEditCoursesModal(value);
    // }

    const handleDelCourseModal = (value) => {
      setDisplayDelCoursesModal(value);
    }


    const handleDeleteSuccess = (val) => {

      console.log("val delete success " , val);
      setDeleteSuccess(true);

    }


    const handleSearch = (val) => {
      setSearch(val);
    }


    if (deleteSuccess)
      {
        setTimeout( () => {
          setDeleteSuccess(false);
          setDisplayDelCoursesModal(false);
        } , 4000);
      }
   

 
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
  

    return (
      <>
        <div className="flex flex-col gap-y-4 py-10">
          <MainHeading title="Courses" />

          {/*  section 1 */}
          <div
            className="flex justify-between"
            data-aos="fade-up"
            data-aos-duration="200"
          >
            <SearchField onSearch={handleSearch} />
            <div className="flex gap-x-4">
             {/*  <img
                src={FilterIcon}  onClick={() => { setFilter(!filter) }}
              /> */}
              <Link to="addCourse">
                <Button
                  button_type="primary"
                  button_size="medium"
                  text="Add Course"
                  icon="left"
                  src={PlusBig}
                  onclick={() => {
                    setDisplayAddCoursesModal(true);
                  }}
                />
              </Link>
            </div>
          </div>

          <Modal
            isOpen={displayAddCoursesModal}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <AddCourse closeModal={handleAddCourseModal} refreshData={handleAllData} /* onAddCourse={handleAddCourseModal} */ />
          </Modal>


          {/* section 2 */}
          <table
            className="border border-secondary rounded-lg"
            data-aos="fade-up"
            data-aos-duration="220"
          >
            {/*  iterating table head values */}
            <thead className="border-b border-secondary">
              <tr className="text-left bg-snowWhite">
                {tableHead.map((headings, i) => {
                  return (
                    <>
                      <td
                        className="py-3 px-2 text-sm text-textPrimary font-semibold"
                        key={i}
                      >
                        <div className="flex gap-x-2">
                          <p> {headings}</p>
                          {headings != "" ? ( <img src={ArrowDown} />) : ("")}
                        </div>
                      </td>
                    </>
                  );
                })}
              </tr>
            </thead>

            <tbody className="text-slate-700">
             {/*  {courses.filter((course) => {
                  return searchedValue.toLowerCase() === ""
                    ? item
                    : item.name
                        .toLowerCase()
                        .includes(searchedValue?.toLowerCase());
                }) */}

                {courses.filter((item) => {
                  return (search == "" ? item : item.courseTitle.toLowerCase().includes(search.toLowerCase()));
                  }).map((course, i) => {
                  return (
                    <>
                      <tr
                        className="text-sm text-sm text-textPrimary font-normal"
                        style={{
                          backgroundColor:
                            i % 2 == 0 ? "transparent" : "#F3F4F6",
                        }}
                        key={i}
                      >
                        <td className="p-2">{course.courseTitle}</td>
                        <td className="p-2">{course.note}</td>
                        <td className="flex gap-x-2">
                          <Link to={`editCourse/${course.id}`} onClick={() => {setDisplayEditCoursesModal(true);}}>
                            <img src={EditIcon} className="p-2" />
                          </Link>
                          <Link to={`deleteCourse/${course.id}`} onClick={() => {setDisplayDelCoursesModal(true);}}>
                            <img src={TrashIcon} className="p-2" />
                          </Link>
                          {/* <Link to={`editUser/${item.id}`}>
                            <img src={EditIcon} className="p-2" />
                          </Link>
                          <Link to={`deleteUser/${item.id}`}>
                            <img src={TrashIcon} className="p-2" />
                          </Link> */}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          {/* <Outlet /> */}

          <Modal
            isOpen={displayEditCoursesModal}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <EditCourse closeModal={handleEditCourseModal} refreshData={handleAllData}  /* onEditCourse={handleEditCourseModal} *//>
          </Modal>


          <Modal
            isOpen={deleteSuccess ? false : displayDelCoursesModal}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DelCourse closeModal={handleDelCourseModal} onDelSuccess={handleDeleteSuccess} refreshData={handleAllData}  /* onDelCourse={handleDelCourseModal} *//>
          </Modal>

          {deleteSuccess && 
          <Modal
            isOpen={deleteSuccess ? true: false}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DelSuccess title="course" />
          </Modal>}


        </div>
      </>
    );
}


export default Courses;