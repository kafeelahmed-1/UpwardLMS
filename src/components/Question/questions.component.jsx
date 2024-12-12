import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SearchField from "../../components/SearchField/searchField.component";
import FilterIcon from "../../assets/filterIcon.svg";
import Button from "../../components/Button/button.component";
import PlusBig from "../../assets/PlusBig.svg";
import MiniDropdown from "../../components/SubjectDropdown/miniDropdown.component";
import CloseFilter from "../../assets/closeFilter.svg";
import Chips from "../../components/Chips/chips.component";
import ImageIcon from "../../assets/imageIcon.svg";
import ThreeDots from "../../assets/threeDots.svg";
import RedDeleteIcon from "../../assets/redDeleteIcon.svg";
import Modal from "react-modal";
import AddQues from "../../components/Question/addQues.component";
import EditQues from "../../components/Question/editQues.component";
import MainHeading from "../../components/Header/header.component";
import Aos from "aos";
import "aos/dist/aos.css";

const Questions = () => {
  console.log("questions comp");
  //HOOKS

  //getting data from backend and storing it in the state
  const [quesData, setQuesData] = useState([]);
  // console.log('QUESTION POOL :' , quesData);

  const [filter, setFilter] = useState(false);
  /*  console.log('filter :' , filter); */

  const [displayAddQuesModal, setDisplayAddQuesModal] = useState(false);
  const [displayEditQuesModal, setDisplayEditQuesModal] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [delSuccess, setDelSuccess] = useState(false);
  /* console.log('delete success :' , delSuccess); */
  const [searchedTitle, setSearchedTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  /* console.log('SUBJECT FROM STATE :' , selectedSubject); */
  const [selectedType, setSelectedType] = useState("");
  // console.log('QUES TYPE FROM STATE :' , selectedType);
  const [clearFilter, setClearFilter] = useState(false);
  // console.log("clear filter :", clearFilter);

  const { id } = useParams();
  console.log("ID  initially:", id);
  console.log(typeof id);

  const navigate = useNavigate();
  // console.log("env variable :" , process.env.REACT_APP_BASE_URL);

  //useEffect hook for getting data from endpoint and loading it on comp mount
  useEffect(() => {
    fetchQuestionsData();
  }, []);
  const token = localStorage.getItem("token");
  /* console.log('comp rendered!'); */
  const fetchQuestionsData = async () => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/Question?pageIndex=0&pageSize=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setQuesData(data.data))
      .catch((error) => console.error("Error:", error.message));

    Aos.init();
  };

  const handleDelete = (e, id_) => {
    const token = localStorage.getItem("token");

    e.stopPropagation();
    setDeleteBtn(false);
    console.log("ques Data : ", quesData);
    console.log(" id from del func is :", typeof id_);
    console.log("use params id  is :", { id });

    fetch(`${process.env.REACT_APP_BASE_URL}/api/Question/${id_}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      /* No need to pass quesData in the body for deletion */
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          // Filter out the deleted question from quesData and update the state
          const updatedQuesData = quesData.filter((ques) => ques.id !== id_);
          setQuesData(updatedQuesData);
          setDelSuccess(true); // Set delSuccess to true if deletion is successful
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleCloseModal = (value) => {
    /*  console.log('valuee' , value); */
    setDisplayAddQuesModal(value);
    setDisplayEditQuesModal(value);
  };

  const handleEditForm = () => {
    setDisplayEditQuesModal(true);
  };

  const handleSearch = (value) => {
    /* console.log("searched valye is :", value); */
    setSearchedTitle(value);
  };

  //sub is passed from child comp (MINI DROPDOWN Comp) to parent comp (this comp i.e. questions comp)
  const handleSelectedSubject = (sub) => {
    /* console.log('sub :' , sub); */
    setSelectedSubject(sub);
  };

  //type is passed from child comp (MINI DROPDOWN Comp) to parent comp (this comp i.e. questions comp)
  const handleSelectedQuesType = (type) => {
    console.log("type:", type);
    setSelectedType(type);
  };

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

  return (
    <>
      {/* main div */}
      <div className="flex flex-col gap-y-4 py-10">
        <MainHeading title="Questions" />

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
              onClick={() => {
                setFilter(!filter);
              }}
            />
            {/* A button */}
            <Link to="addQuestion">
              <Button
                button_type="primary"
                button_size="medium"
                text="Add Question"
                icon="left"
                src={PlusBig}
                onclick={() => {
                  setDisplayAddQuesModal(true);
                }}
              />
            </Link>
          </div>
        </div>
        {/*  SECTION 1 ends here */}

        {/* A modal that opens Add Question Form when add Question button is clicked */}
        <Modal
          isOpen={displayAddQuesModal}
          style={customStyles}
          height="400px"
          width="fitContent"
          ariaHideApp={false}
        >
          <AddQues
            displayModalValue={handleCloseModal}
            ariaHideApp={false}
            refreshStudents={fetchQuestionsData}
          />
        </Modal>

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/*  SECTION 2 */}
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
            <MiniDropdown
              send_subject_to_quesComp={handleSelectedSubject}
              send_quesType_to_quesComp={handleSelectedQuesType}
              resetFilter={clearFilter}
            />

            {/*  a clear filter button wrapped in a div */}
            <div
              onClick={() => {
                setSelectedSubject("Select Subject");
                setSelectedType("Select Type");
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
        {/* section 2 ends here */}

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/* SECTION 3 */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-[10px]">
          {/* mapping data based on filters */}
          {quesData
            .filter((info) => {
              return (
                (searchedTitle.toLowerCase() === ""
                  ? info
                  : info.questionTitle
                      .toLowerCase()
                      .includes(searchedTitle?.toLowerCase())) &&
                (selectedSubject === "Select Subject"
                  ? info
                  : info.subjectDetail.tittle.includes(selectedSubject)) &&
                (selectedType === "Select Type"
                  ? info
                  : info.questionTypeDetail.typeTitle.includes(selectedType))
              );
            })
            .map((info) => {
              return (
                <>
                  {/* when this sub div will be clicked , edit form will be opened */}
                  <Link to={`/questions/editQues/${info.id}`}>
                    <div
                    
                    className="border border-secondary rounded-lg px-4 pt-4 pb-6 w-full max-w-sm h-auto flex flex-col gap-y-2 sm:max-w-md md:max-w-lg"
                    /* onClick={handleEditForm} */
                  
                  
                      key={info.id}
                      onClick={handleEditForm}
                      data-aos="fade-up"
                      data-aos-duration="220"
                    >
                      {/* div for soace between chips and actions button */}
                      <div className="flex justify-between">
                        {/* sub div 1 : CHIPS */}

                        <div className="flex gap-1 sm:gap-4 md:gap-6 lg:gap-5 flex-nowrap sm:flex-wrap">


                          <Chips
                            text={info.subjectDetail.tittle}
                            size="large"
                            state="default"
                          />
                          <Chips
                            text={info.questionTypeDetail.typeTitle}
                            size="large"
                            image="true"
                          />
                          {/* this image icon will appear if and only if the question contains a document */}
                          <div
                            className="self-center"
                            style={{
                              display:
                                info.documentId === 0 ||
                                info.documentId === "null"
                                  ? "none"
                                  : "block",
                            }}
                          >
                            <img src={ImageIcon} />
                          </div>
                        </div>

                        {/* sub div 2 : actions div */}
                        <div className="flex flex-col">
                          {/* THREE DOTS */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setDeleteBtn(!deleteBtn);
                            }}
                          >
                            {/* three dots imageto perfom actions (delete) */}
                            <Link to={`/questions/actions/${info.id}`}>
                              <img src={ThreeDots} className="p-1" />
                            </Link>
                          </div>

                          {/* this is delete button div , initially its hidden */}
                          {/*  when clicked on this div, delete option will be displayed */}
                          <Link
                            to={`/questions/deleteQuestion/${info.id}`}
                            onClick={(e) => {
                              handleDelete(e, info.id);
                            }}
                          >
                            <div
                              className="border py-3 px-5 rounded-lg bg-disabled border-secondary shadow w-[220px] min-h-11 h-[fit-content]"
                              style={{
                                display:
                                  id == info.id && deleteBtn ? "block" : "none",
                                position: "absolute",
                                zIndex: "0",
                                marginLeft: "-196px",
                                marginTop: "33px",
                              }}
                            >
                              {/* this div contains a trash icon and a delete text */}
                              <div
                                className="flex gap-x-3"
                                // onClick={() => {
                                //   alert("open modal");
                                // }}
                              >
                                <img src={RedDeleteIcon} />
                                <p className="w-[fit-content] text-sm text-red-500">
                                  Delete
                                </p>
                              </div>
                            </div>
                          </Link>

                          {delSuccess && navigate("/questions")}
                        </div>
                      </div>

                      {/*sub div 3:  div for ques title */}
                      <div>
                        <p
                          className={`text-sm h-[60px] ${
                            info.questionTitle.length >= 147
                              ? "text-ellipsis overflow-hidden"
                              : ""
                          }`}
                        >
                          {info.questionTitle.length >= 147
                            ? info.questionTitle + "....."
                            : info.questionTitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>

        {/* when clicked on question card , Edit Popup will be opened inside modal */}
        <Modal
          isOpen={displayEditQuesModal}
          style={customStyles}
          height="400px"
          width="fitContent"
          ariaHideApp={false}
        >
          <EditQues
            displayModalValue={handleCloseModal}
            ariaHideApp={false}
            id={id}
            refreshStudents={fetchQuestionsData}
          />
        </Modal>

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      </div>
    </>
  );
};

export default Questions;
