import { useEffect , useState } from "react";
import Modal from 'react-modal';
import MainHeading from "../../components/Header/header.component";
import SearchField from "../../components/SearchField/searchField.component";
import Button from "../../components/Button/button.component";
import AddBatch from "./addBatch.component";
import EditBatch from "./editBatch.component";
import DeleteBatch from "./delBatch.component";
import DelSuccess from "../DeleteSuccessPopup/delSuccess.component";
// import DelCourse from "../../components/CoursesCRUD/deleteCourse.component";
// import {Link} from 'react-router-dom';
import FilterIcon from "../../assets/filterIcon.svg";
import PlusBig from "../../assets/PlusBig.svg";
import ArrowDown from "../../assets/arrowDown.svg";
import EditIcon from "../../assets/editIcon.svg";
import TrashIcon from "../../assets/trash.svg";
import {Link , Outlet} from 'react-router-dom';

const AllBatches = () => {

    const [batches , setBatches] = useState([]);
    // console.log("batches array bb:" , batches);

    const [search , setSearch] = useState("");
    // console.log("Search from batches" , search);
    
    const [displayAddCoursesModal , setDisplayAddCoursesModal] = useState(false);
    // console.log("displat add courses modal :" , displayAddCoursesModal);

    const [displayEditCoursesModal , setDisplayEditCoursesModal] = useState(false);
    // console.log("display edit courses modal :" , displayEditCoursesModal);

    const [displayDelCoursesModal , setDisplayDelCoursesModal] = useState(false);
    // console.log("del courses modal :" , displayDelCoursesModal);

    const [deleteSuccess , setDeleteSuccess] = useState(false);

    let tableHead = ["Batch Title" , "Note" ,  "Start Date" , "End Date" , "Course" , ""];

    useEffect(() => {

         handleAllData();
 
    } , []);



    const handleAllData = () => {

      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_BASE_URL}/api/Batch?pageIndex=0&pageSize=110`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).
      then((response) => response.json()).
      then((data) => setBatches(data.data));

    }


    const handleCloseModal = (value) => {
      // console.log("value from child comp is :" , value);
      setDisplayAddCoursesModal(value);

    }

    const handleCloseEditCourseModal = (value) => {

      setDisplayEditCoursesModal(value);
    }

    const handleCloseDelCoursesModal = (value) => {
      setDisplayDelCoursesModal(value);
    }
 

    const handleSearch = (val) => {
      setSearch(val);

    }

    const handleDeleteSuccess = (val) => {

      console.log("val delete success " , val);
      setDeleteSuccess(true);

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
  


    return(
        <>
        <div className="flex flex-col gap-y-4 py-10">
          <MainHeading title="Batches" />

          {/*  section 1 */}
          <div
            className="flex justify-between"
            data-aos="fade-up"
            data-aos-duration="200"
          >
            <SearchField onSearch={handleSearch} />
            <div className="flex gap-x-4">
              {/* <img
                src={FilterIcon}  onClick={() => { setFilter(!filter) }}
              /> */}
              <Link to="addBatch">
                <Button
                  button_type="primary"
                  button_size="medium"
                  text="Add Batch"
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
            <AddBatch closeModal={handleCloseModal} refreshData={handleAllData} />
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

                {batches.filter((item) => {
                  return (search == "" ? item : item.batchTitle.toLowerCase().includes(search.toLowerCase()));
                  }).map((batch, i) => {
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
                        <td className="p-2">{batch.batchTitle}</td>
                        <td className="p-2">{batch.note}</td>
                        <td className="p-2">{batch.startDate.substr(0,10)}</td>
                        <td className="p-2">{batch.endDate.substr(0,10)}</td>
                        {batch.courseDetail === null ? (
                           <td className="p-2">NA</td>
                        )
                        :
                        (
                          <td className="p-2">{batch.courseDetail.courseTitle}</td>
                        )
                        }
                        <td className="flex gap-x-2">
                          <Link to={`editBatch/${batch.id}`} onClick={() => {setDisplayEditCoursesModal(true);}}>
                            <img src={EditIcon} className="p-2" />
                          </Link>
                          <Link to={`deleteBatch/${batch.id}`} onClick={() => {setDisplayDelCoursesModal(true);}}>
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
            <EditBatch closeModal={handleCloseEditCourseModal}  refreshData={handleAllData} />
          </Modal>


          <Modal
            isOpen={deleteSuccess ? false : displayDelCoursesModal}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DeleteBatch closeModal={handleCloseDelCoursesModal} onDelSuccess={handleDeleteSuccess}  refreshData={handleAllData}/>
          </Modal>


          {deleteSuccess && 
          <Modal
            isOpen={deleteSuccess ? true: false}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DelSuccess title="batch" />
          </Modal>}

          
        </div>
        </>
    );
}


export default AllBatches;