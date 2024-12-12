import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SearchField from "../../components/SearchField/searchField.component";
import CodeIcon from "../../assets/code.svg";
import ShortIcon from "../../assets/short.svg";
import MultipleChoiceIcon from "../../assets/multiple.svg";
import DeleteIcon from "../../assets/Delete.svg";
import InstanceIcon from "../../assets/Instance.svg";
import Isign from "../../assets/Exlamentory.svg";
import CrossSign from "../../assets/Cross.svg";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert/alert.component";
import Button from "../../components/Button/button.component";
import FileDocument from "./FileDocument";
import { useNavigate } from "react-router-dom";

const AssessmentQuestions = ({ onSubmit, onUpdate , assessmentData , title , id , success}) => {
  // console.log("assessment idddddddddddddd: : : : :" , id);
  // console.log("title is ::::::::::::::::::::::::" , title);
  const [questions, setQuestions] = useState([]);
  console.log("QUESTIONS ::::::::::" , questions);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [droppedQuestions, setDroppedQuestions] = useState([]);
  // console.log("dropped questions ::::::::::::::::::::" , droppedQuestions);
  const [avlAssessmentQuestions , setAvlAssessmentQuestions] = useState([]);
  // console.log("avl assessment questions ::::::::::" , avlAssessmentQuestions);
  const [isVisible, setIsVisible] = useState(true);
  const [search, setSearch] = useState();
  const navigate = useNavigate();


  const QuesIds = questions.map((ques) => {
    return ques.id;
  });



  const filterQuestionsFromPool = avlAssessmentQuestions.filter((avlQues) => (
    // QuesIds.includes(avlQues.questionId)
    // QuesIds!==avlQues.questionId
    console.log("all questions",avlQues)
  ))
 
 

  


  console.log("filtered avl ques :::::::::::::::::::::::::::::::::" , filterQuestionsFromPool);

  console.log("ques ids only   ::::::::::" , QuesIds);
  
  const handleClose = () => {
    setIsVisible(!isVisible);
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  const handleSaveChanges = () => {
    const combinedData = {
      assessmentHead: assessmentData,
      assessmentQuestions: droppedQuestions,
    };
    onSubmit(combinedData);
  };


  const handleUpdateAssessment = () => {

    const dataOnEdit = {
      assessmentHead: assessmentData,
      assessmentQuestions: [
        ...droppedQuestions.map((question) => ({
          id:0,
          questionId:question?.id, 
          assessmentHeadId:parseInt(id)
        }))].concat([
          ...avlAssessmentQuestions.map((question) => ({
          id:question.id ,
          questionId:question.questionId,
          assessmentHeadId:question.assessmentHeadId , 
        }))]),
    }
    onUpdate(dataOnEdit.assessmentHead , dataOnEdit.assessmentQuestions);
  }


  const handleSelect = (question) => {
    setDroppedQuestions(question);
  };

  const getTextColor = (typeTitle) => {
    switch (typeTitle) {
      case "Multiple Choice":
        return "#4CA154";
      case "Short Answer":
        return "#F2C14B";
      case "Code Snippet":
        return "#3662E3";
      default:
        return "inherit";
    }
  };

  const getBorderColor = (typeTitle) => {
    switch (typeTitle) {
      case "Multiple Choice":
        return "rgba(76, 161, 84, 0.3)";
      case "Short Answer":
        return "#F2C14B";
      case "Code Snippet":
        return "#3662E3";
      default:
        return "transparent";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
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
      .then((data) => {
        setQuestions(data.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/Subject?pageIndex=0&pageSize=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });

      fetchAssessmentQuestions();

  }, []);



  useEffect(() => {
    localStorage.setItem("droppedQuestions", JSON.stringify(droppedQuestions));
  }, [droppedQuestions]);





  //fetch available assessment questions when updating assessment
  const fetchAssessmentQuestions = () => {

      const token = localStorage.getItem("token");

      if (title === "edit")
      {
      //fetch edit questions
      fetch(
        `${process.env.REACT_APP_BASE_URL}/api/AssessmentHead/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log("ASSESSMENT QUESTIONS ON EDITTTT :" , data.data.assessmentQuestions);
          setAvlAssessmentQuestions(data.data.assessmentQuestions);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
      }

  }






  const handleSubjectClick = (subjectId) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleDrop = (question) => {
    const newDroppedQuestions = [...droppedQuestions, question];
    setDroppedQuestions(newDroppedQuestions);

    const remainingQuestions = questions.filter((q) => q.id !== question.id);
    setQuestions(remainingQuestions);
  };

  //drag question
  const QuestionCard = ({ question }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "CARD",
      item: { type: "CARD", question },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        style={{ opacity: isDragging ? 0.5 : 1, marginBottom: 10}}
      >
        <div>
          <div
            className="tab"
            style={{
              color: getTextColor(question?.questionTypeDetail?.typeTitle),
              borderColor: getBorderColor(
                question?.questionTypeDetail?.typeTitle
              ),
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                fontFamily: "Lato",
                // marginLeft: 15,
              }}
            >
              {question?.questionTypeDetail?.typeTitle}
            </p>
            {question?.questionTypeDetail?.typeTitle === "Multiple Choice" && (
              <img src={MultipleChoiceIcon} alt="Multiple Choice" />
            )}
            {question?.questionTypeDetail?.typeTitle === "Short Answer" && (
              <img src={ShortIcon} alt="Short Answer" />
            )}
            {question?.questionTypeDetail?.typeTitle === "Code Snippet" && (
              <img src={CodeIcon} alt="Code Snippet" />
            )}
          </div>
          <p
            style={{
              color: "#121826",
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "Lato",
              margin: 5,
            }}
          >
            {question?.questionTitle}
          </p>
        </div>
      </div>
    );
  };



  const QuestionDropZone = ({ onSelect }) => {


    const [{ canDrop, isOver }, drop] = useDrop({
      accept: "CARD",
      drop: (item) => handleDrop(item.question),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const isActive = canDrop && isOver;

    //drag with icon
    const handleMoveCard = (dragIndex, hoverIndex) => {
      const draggedCard = droppedQuestions[dragIndex];
      const updatedQuestions = [...droppedQuestions];
      updatedQuestions.splice(dragIndex, 1);
      updatedQuestions.splice(hoverIndex, 0, draggedCard);
      setDroppedQuestions(updatedQuestions);
    };

    //delete with delete icon
    const handleRemove = (index) => {
      const updatedDroppedQuestions = [...droppedQuestions];
      updatedDroppedQuestions.splice(index, 1);
      setDroppedQuestions(updatedDroppedQuestions);
    };


    const handleDeleteAvlQues = (id , quesId) => {

      console.log("delete ques id :::::::::" , id);
      console.log("s=filter qyes id ::::::::::::" , quesId);

      // const remainingQuestions = questions.filter((ques) => ques.id == quesId);
      // console.log("remaining questions :::::::::" , remainingQuestions);
      // setQuestions([...questions,remainingQuestions]);

      if (id != 0){

        console.log("on del assessment questions");
        const token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_BASE_URL}/api/QuestionAssessment/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          /* No need to pass quesData in the body for deletion */
        })
          .then((response) => response.json())
          .then((response) => {
            //  console.log("DEL RESPONSE :" , response);
            if (response.success)
              {
                // alert("BATCH DELETED SUCCESSFULLY!!");
                // onDelSuccess(response.success);
                console.log("AVL QUESTION DELETED SUCCESSFULLY");
                console.log("response :" , response.success);
                fetchAssessmentQuestions();
                
                // const remainingQuestions = questions.filter((ques) => ques.id !== quesId);
                // console.log("remaining questions :::::::::" , remainingQuestions);
                // let final = questions.filter((ques) => ques.id != remainingQuestions.id);
                // console.log("final :" , final);
                // setQuestions(final);



                // setTimeout(() => {

                //   navigate("/students");

                // } , 4000)
              }
            
          })
          .catch((error) => {
            console.error("Error deleting course:", error);
          });

          // refreshData();
      }
    }



    return (
      <div ref={drop} className="QuestionDropZone border-2 border-green-900">
      <div style={{display:title === "edit" ? 'block' : 'none'}}>
       {avlAssessmentQuestions?.map((questions, index) => (
        <>
          {/* available assessment questions container */}
          <div key={index} className="drop-container border border-blue-400">
            {/*   div 1 */}
            <div
              style={{
                position: "absolute",
                right: "19%",
                // marginTop: 5,
              }}
            >
              <button onClick={() => handleMoveCard(index, index + 1)}>
                <img src={InstanceIcon} alt="InstanceIcon" />
              </button>
            </div>
            {/*  div 2 */}
            <div
              style={{
                position: "absolute",
                right: "18%",
                marginTop: 33,
              }}
            >
              <button onClick={() => handleDeleteAvlQues(questions.id , questions.questionId)}>
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
            {/*  div 3 */}
            <div style={{ display: "flex" }}>
              <p className="subjectTitle-Tab">
                {questions?.questionDetail?.subjectDetail?.tittle}
              </p>
              <div
                className="typeDetail-Tab"
                style={{
                  border: `1px solid ${getBorderColor(
                    questions?.questionDetail?.questionTypeDetail?.typeTitle
                  )}`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {questions?.questionDetail?.questionTypeDetail?.typeTitle ===
                  "Multiple Choice" && (
                  <img src={MultipleChoiceIcon} alt="Multiple Choice" />
                )}
                {questions?.questionDetail?.questionTypeDetail?.typeTitle ===
                  "Short Answer" && <img src={ShortIcon} alt="Short Answer" />}
                {questions?.questionDetail?.questionTypeDetail?.typeTitle ===
                  "Code Snippet" && <img src={CodeIcon} alt="Code Snippet" />}
                <p
                  style={{
                    color: getTextColor(
                      questions?.questionDetail?.questionTypeDetail?.typeTitle
                    ),
                  }}
                >
                  {questions?.questionDetail?.questionTypeDetail?.typeTitle}
                </p>
              </div>
            </div>
            {/*  xxxxxxx */}
            <p
              style={{
                color: "#121826",
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "Lato",
                padding: 8,
              }}
            >
              {questions?.questionDetail?.questionTitle}
            </p>
            {questions?.fileDocumentDetail && (
              <FileDocument
                fileId={questions?.fileDocumentDetail?.id}
                fileName={questions?.fileDocumentDetail?.sourceFileName}
              />
            )}
            {/* <hr style={{ width: 356, border: "1px" }} /> */}
            {questions?.questionDetail?.questionTypeDetail?.typeTitle ===
              "Multiple Choice" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 10,
                }}
              >
                <label style={{ marginBottom: "8px" }}>
                  <input
                    type="radio"
                    name={`option${index}`}
                    value="Option A"
                    style={{ marginRight: 10 }}
                  />
                  Option A
                </label>
                <label style={{ marginBottom: "8px" }}>
                  <input
                    type="radio"
                    name={`option${index}`}
                    value="Option B"
                    style={{ marginRight: 10 }}
                  />
                  Option B
                </label>
                <label style={{ marginBottom: 8 }}>
                  <input
                    type="radio"
                    name={`option${index}`}
                    value="Option C"
                    style={{ marginRight: 10 }}
                  />
                  Option C
                </label>
              </div>
            )}
            {questions?.questionDetail?.questionTypeDetail?.typeTitle ===
              "Short Answer" && (
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  padding: 8,
                  border: "none",
                  borderRadius: 8,
                  border: "1px solid #D2D5DA",
                  marginTop: 10,
                }}
                placeholder="Short Answer"
              />
            )}
            {questions?.questionDetail?.questionTypeDetail?.typeTitle ===
              "Code Snippet" && (
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  padding: 8,
                  border: "1px solid #D2D5DA",
                  borderRadius: 8,
                  marginTop: 10,
                }}
                placeholder="Code Snippet"
              />
            )}
          </div>
          </>
        ))}
      </div>
    
      <div>
        {droppedQuestions?.map((droppedQuestion, index) => (
          //questions dropped from question pool on left
          <div key={index} className="drop-container">
            {/*   div 1 */}
            <div
              style={{
                position: "absolute",
                right: "19%",
                // marginTop: 5,
              }}
            >
              <button onClick={() => handleMoveCard(index, index + 1)}>
                <img src={InstanceIcon} alt="InstanceIcon" />
              </button>
            </div>
            {/*  div 2 */}
            <div
              style={{
                position: "absolute",
                right: "18%",
                marginTop: 33,
              }}
            >
              <button onClick={() => handleRemove(index)}>
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
            {/*  div 3 */}
            <div style={{ display: "flex" }}>
              <p className="subjectTitle-Tab">
                {droppedQuestion?.subjectDetail?.tittle}
              </p>
              <div
                className="typeDetail-Tab"
                style={{
                  border: `1px solid ${getBorderColor(
                    droppedQuestion?.questionTypeDetail?.typeTitle
                  )}`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {droppedQuestion?.questionTypeDetail?.typeTitle ===
                  "Multiple Choice" && (
                  <img src={MultipleChoiceIcon} alt="Multiple Choice" />
                )}
                {droppedQuestion?.questionTypeDetail?.typeTitle ===
                  "Short Answer" && <img src={ShortIcon} alt="Short Answer" />}
                {droppedQuestion?.questionTypeDetail?.typeTitle ===
                  "Code Snippet" && <img src={CodeIcon} alt="Code Snippet" />}
                <p
                  style={{
                    color: getTextColor(
                      droppedQuestion?.questionTypeDetail?.typeTitle
                    ),
                  }}
                >
                  {droppedQuestion?.questionTypeDetail?.typeTitle}
                </p>
              </div>
            </div>
            {/*  xxxxxxx */}
            <p
              style={{
                color: "#121826",
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "Lato",
                padding: 8,
              }}
            >
              {droppedQuestion?.questionTitle}
            </p>
            {droppedQuestion?.fileDocumentDetail && (
              <FileDocument
                fileId={droppedQuestion?.fileDocumentDetail?.id}
                fileName={droppedQuestion?.fileDocumentDetail?.sourceFileName}
              />
            )}
            {/* <hr style={{ width: 356, border: "1px" }} /> */}
            {droppedQuestion?.questionTypeDetail?.typeTitle ===
              "Multiple Choice" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 10,
                }}
              >
                <label style={{ marginBottom: "8px" }}>
                  <input
                    type="radio"
                    name={`option${index}`}
                    value="Option A"
                    style={{ marginRight: 10 }}
                  />
                  Option A
                </label>
                <label style={{ marginBottom: "8px" }}>
                  <input
                    type="radio"
                    name={`option${index}`}
                    value="Option B"
                    style={{ marginRight: 10 }}
                  />
                  Option B
                </label>
                <label style={{ marginBottom: 8 }}>
                  <input
                    type="radio"
                    name={`option${index}`}
                    value="Option C"
                    style={{ marginRight: 10 }}
                  />
                  Option C
                </label>
              </div>
            )}
            {droppedQuestion?.questionTypeDetail?.typeTitle ===
              "Short Answer" && (
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  padding: 8,
                  border: "none",
                  borderRadius: 8,
                  border: "1px solid #D2D5DA",
                  marginTop: 10,
                }}
                placeholder="Short Answer"
              />
            )}
            {droppedQuestion?.questionTypeDetail?.typeTitle ===
              "Code Snippet" && (
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  padding: 8,
                  border: "1px solid #D2D5DA",
                  borderRadius: 8,
                  marginTop: 10,
                }}
                placeholder="Code Snippet"
              />
            )}
          </div>
        ))}
       </div>

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}


        {isActive ? (
          <p>Release to drop</p>
        ) : (
          <p
            style={{
              fontSize: 14,

              fontWeight: 400,
              fontFamily: "Lato",
              color: "#6C727F",
              width: 150,
            }}
          >
            Drag a question here to add it to the assessment.
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ position: "relative"}}>
          <div style={{ marginTop: 15}}>
            <SearchField onSearch={handleSearch} />
            <div className="subject-tabs">
              {subjects.map((subject) => (
                <div key={subject.id}>
                  <button
                    className={`subject-tab ${
                      selectedSubjects.includes(subject.id) ? "active" : ""
                    }`}
                    onClick={() => handleSubjectClick(subject.id)}
                  >
                    {subject?.tittle}
                    {selectedSubjects.includes(subject.id) && (
                      <span className="cross-icon">&#10005;</span>
                    )}
                  </button>
                </div>
              ))}
            </div>

           
            {isVisible ? (
              <div className="questionEdit-container">     {/* blue alert */}
                <div style={{ display: "flex", marginLeft: 10 }}>
                  <img src={Isign} alt="Sign" />
                  <h6
                    style={{
                      color: "#121826",
                      fontWeight: 700,
                      fontSize: 14,
                      fontFamily: "Lato",
                      textAlign: "center",
                      marginLeft: 12,
                    }}
                  >
                    Questions are not editable
                  </h6>
                  <button
                    onClick={handleClose}
                    style={{
                      marginLeft: "30%",
                    }}
                  >
                    <img src={CrossSign} alt="CrossSign" />
                  </button>
                </div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#6C727F",
                    marginLeft: 33,
                  }}
                >
                  Please visit{" "}
                  <Link>
                    <span
                      style={{
                        color: "#4E80EE",
                        fontWeight: 600,
                        fontSize: 14,
                        fontFamily: "Lato",
                        textDecoration: "underline",
                      }}
                    >
                      questions
                    </span>{" "}
                  </Link>
                  to edit them.
                </p>
              </div>
              //blue alert ends ---------------

            ) : null}


            {/* question pool */}
            <div
              className="questions-list"
              style={{
                overflowY: "auto",
                height: 1237,
                // height:'fit-content',
                maxHeight:650,
                width: 380,
                marginTop:10,
                marginBottom:10
              }}
            >
              {questions
                .filter((question) =>
                  selectedSubjects.length === 0
                    ? true
                    : selectedSubjects.includes(question.subjectId)
                )
                .map((question) => (
                  <div key={question.id} className="me-2">
                    <div className="container">
                      <QuestionCard question={question} />
                    </div>
                  </div>
                ))}
            </div>

          </div>
          <QuestionDropZone onSelect={handleSelect} />
        </div>
      </DndProvider>


      </div>
      <div className="bg-default flex justify-end">
      <div
        style={{
          minWidth: 397,
          width:'fit-content',
          minHeight: 92,
          height:"fit-content",
          // backgroundColor: "#FFFFFF",
          display: "flex",
          justifyContent:'end',
          padding: 25,
          gap:20
        }}
      >
        {success && <Alert alert_type="successLight" title="Success" description="Assessment Updated Successfully!" />}

        {title === "add" && 
        <Button
          button_type="primary"
          button_size="medium"
          text="Save Changes"
          icon="none"
          src=""
          onclick={handleSaveChanges}
        />
        }
        {title === "edit" && 
          <Button
          button_type="primary"
          button_size="medium"
          text="Save Changes"
          icon="none"
          src=""
          onclick={handleUpdateAssessment}
        />
        }
      </div>
      </div>
    </>
  );
};

export default AssessmentQuestions;
