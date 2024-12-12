import { useEffect , useState } from "react";
import Modal from 'react-modal';
import MainHeading from "../Header/header.component";
import SearchField from "../SearchField/searchField.component";
import Button from "../Button/button.component";
import AddCategory from "./addCategory.component";
import EditCategory from "./editCategory.component";
import DeleteCategory from "./delCategory.component";
import DelSuccess from "../DeleteSuccessPopup/delSuccess.component";
// import {Link} from 'react-router-dom';
// import FilterIcon from "../../assets/filterIcon.svg";
import PlusBig from "../../assets/PlusBig.svg";
import ArrowDown from "../../assets/arrowDown.svg";
import EditIcon from "../../assets/editIcon.svg";
import TrashIcon from "../../assets/trash.svg";
import {Link} from 'react-router-dom';


const Categories = () => {


    //HOOKS
    const [category , setCategory] = useState([]);
    // console.log("CATEGAORIES array :" , category);
    
    const [displayAddCoursesModal , setDisplayAddCoursesModal] = useState(false);
    // console.log("displat add courses modal :" , displayAddCoursesModal);

    const [displayEditCoursesModal , setDisplayEditCoursesModal] = useState(false);
    // console.log("display edit courses modal :" , displayEditCoursesModal);

    const [displayDelCoursesModal , setDisplayDelCoursesModal] = useState(false);
    // console.log("del courses modal :" , displayDelCoursesModal);

    const [deleteSuccess , setDeleteSuccess] = useState(false);

    const [search , setSearch] = useState('');
    // console.log("SEARCH from courses:" , search);

    let tableHead = ["Category Title" , ""];

    useEffect(() => {

        handleAllData();

    } , []);


    
    //FUNCTIONS


    const handleAllData = () => {

      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_BASE_URL}/api/MarksCategory?pageIndex=0&pageSize=123`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).
      then((response) => response.json()).
      then((data) => setCategory(data.data));

    }



    const handleCloseAddCategoryModal = (value) => {
      // console.log("value from child comp is :" , value);
      setDisplayAddCoursesModal(value);

    }

    // const handleAddCategory = (value) => {
    //   setDisplayAddCoursesModal(value);
    // }

    // const handleEditCourse = (value) => {
    //   setDisplayEditCoursesModal(value);
    // }

    // const handleDelCategory= (value) => {
    //   setDisplayDelCoursesModal(value);
    // }

    const handleCloseEditCategoryModal = (value) => {

      setDisplayEditCoursesModal(value);
    }

    const handleCloseDelCategoryModal = (value) => {
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
          <MainHeading title="Marks Categories" />

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
              <Link to="addCategory">
                <Button
                  button_type="primary"
                  button_size="medium"
                  text="Add Category"
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
            <AddCategory closeModal={handleCloseAddCategoryModal} refreshData={handleAllData} /* onAddCategory={handleAddCategory}  *//>
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

                {category.filter((item) => {
                  return (search == "" ? item : item.marksTitle.toLowerCase().includes(search.toLowerCase()));
                  }).map((item, i) => {
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
                        {/* <td className="p-2">{item.id}</td> */}
                        <td className="p-2">{item.marksTitle}</td>
                        <td className="flex gap-x-2">
                          <Link to={`editCategory/${item.id}`} onClick={() => {setDisplayEditCoursesModal(true);}}>
                            <img src={EditIcon} className="p-2" />
                          </Link>
                          <Link to={`deleteCategory/${item.id}`} onClick={() => {setDisplayDelCoursesModal(true);}}>
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
            <EditCategory closeModal={handleCloseEditCategoryModal} refreshData={handleAllData}  /* onEditCategory={handleEditCourse} *//>
          </Modal>


          <Modal
            isOpen={deleteSuccess ? false : displayDelCoursesModal}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DeleteCategory closeModal={handleCloseDelCategoryModal}  onDelSuccess={handleDeleteSuccess} refreshData={handleAllData} /*  onDelCategory={handleDelCategory} */ />
          </Modal>

          {deleteSuccess && 
          <Modal
            isOpen={deleteSuccess ? true: false}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DelSuccess title="category"  />
          </Modal>}

          
        </div>
        </>
    );
}


export default Categories;