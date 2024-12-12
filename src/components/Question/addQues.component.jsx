import PlusIcon from "../../assets/plus.svg";
import Radio from "../../components/Radio/radio.component";
import Button from "../../components/Button/button.component";
import Dropdown from "../SubjectDropdown/dropdown.component";
import Label from "../../components/Label/label.component";
import FormTitle from "../FormTitle/formTitle.component";
import CodeSnippet from "../../components/CodeSnippet/codeSnippet.component";
import MultipleChoices from "../MultipleChoices/multipleChoices.component";
import ShortAns from "../ShortAnswer/shortAns.component";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlusBig from "../../assets/PlusBig.svg";
import Alert from "../Alert/alert.component";

const AddQues = ({ displayModalValue, refreshStudents }) => {
  //HOOKS

  const hiddenFile = useRef(null);

  //USE STATE HOOKS for managing data
  const [displayMcqBlock, setDisplayMcqBlock] = useState(false);
  const [error, setError] = useState("");
  const [allFieldsError, setAllFieldsError] = useState(false);
  const [displayShortAnsBlock, setDisplayShortAnsBlock] = useState(false);
  const [displayCodeSnippetBlock, setDisplayCodeSnippetBlock] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [quesData, setQuesData] = useState({
    id: 0,
    avlAnswer: [],
    correctAnswer: "",
    documentId: 0,
    questionTitle: "",
    questionTypeId: 1,
    subjectId: 1,
  });
  // console.log('ques data :' , quesData);

  const [addSuccessMessage, setAddSuccessMessage] = useState();
  // console.log('add quessuccess message :' , addSuccessMessage);

  /*  console.log('ques data comp :' , quesData);
   */
  const [questionType, setQuestionType] = useState([]);
  /*  console.log('question type data :' , questionType); */

  const navigate = useNavigate();

  //USE EFFECT HOOK for fetching data and setting it initially , setting states initially as well
  useEffect(() => {
    setDisplayMcqBlock(true);
    setDisplayShortAnsBlock(false);
    setDisplayCodeSnippetBlock(false);
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
      /*  .then((data) => console.log(data.data)) */
      .catch((error) => console.error("Error:", error.message));

    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/QuestionType?pageIndex=0&pageSize=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((info) => setQuestionType(info.data))
      .catch((error) => console.error("Error:", error.message));
  }, []);

  //FUNCTIONS
  //function for handling QUESTION TYPE i.e. short ans , code snippet , mcqs
  const handleType = (value, id) => {
    /*  here value has been passed from child comp (to parent comp) */

    console.log("ques type :", value, "+", "ques type id :", id);
    setQuesData({
      ...quesData,
      questionTypeId: parseInt(id),
    });

    if (value === "Multiple Choice") {
      setDisplayMcqBlock(true);
      setDisplayShortAnsBlock(false);
      setDisplayCodeSnippetBlock(false);
    } else if (value === "Short Answer") {
      setDisplayShortAnsBlock(true);
      setDisplayMcqBlock(false);
      setDisplayCodeSnippetBlock(false);
    } else {
      setDisplayCodeSnippetBlock(true);
      setDisplayMcqBlock(false);
      setDisplayShortAnsBlock(false);
    }
  };

  //function for handling REST API POST request, posting data to backend, it will be triggered on ADD QUES button
  const handleAddQues = (e) => {
    e.preventDefault();
    if (quesData.questionTitle == "") {
      setError("fields are required");
      setAllFieldsError(true);
      return;
    }
    console.log("BEFORE FETCH ");
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(quesData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setSubmissionMessage("Question Added successfully.");
          setError("");
        }
        refreshStudents();
      })
      .catch((e) => {
        setSubmissionMessage("");
        setError("Question are not added....!");
      });
  };

  const handleCancel = () => {
    displayModalValue(false);
    navigate("/questions");
  };

  const handleQuestionTitle = (e) => {
    let value = e.target.value;
    setQuesData({
      ...quesData,
      questionTitle: value,
    });
  };

  const handleOptions = (value) => {
    setQuesData({
      ...quesData,
      avlAnswer: value,
    });
  };

  const handleSubject = (id) => {
    /* console.log('subject is ' ,  id); */
    setQuesData({
      ...quesData,
      subjectId: id,
    });
  };

  const handleShortQA = (ans) => {
    console.log("CORRECT ANS , ", ans);
    setQuesData({
      ...quesData,
      correctAnswer: ans,
    });
  };

  const handleCodeSnippet = (code_ans) => {
    console.log("correct code :", code_ans);
    setQuesData({
      ...quesData,
      correctAnswer: code_ans,
    });
  };

  const handleFile = () => {
    hiddenFile.current.click();
  };

  const onFileChange = (e) => {
    console.log("files ;", e.target.files[0].name);
    let fileName = e.target.files[0];

    const formData = new FormData();
    formData.append("file", fileName);
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/FileDocument/File`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA :", data, data.data, data.data.id);
        setQuesData({
          ...quesData,
          documentId: data.data.id,
        });
      })
      .catch((error) => console.error("Error:", error.message));
  };

  const onClose = (value) => {
    //value from child to parent
    console.log("boolean value from form title is :", value);
    displayModalValue(value);
  };

  return (
    <>
      {/*  FORM DIV starts here */}
      <div className="form-container-styles">
        {/*   TITLE OF FORM */}
        {/*  comp for form title */}
        <FormTitle title="Add Question" formClosed={onClose} />

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        {/*  FORM */}

        {/* form-styles and input-div-styles are custom tailwindcss classes in index.css */}
        <form className="form-styles">
          {/*  Question title field */}
          <div className="input-div-styles">
            <Label label="Question" />
            <input
              type="text"
              placeholder="Question"
              className={`${
                allFieldsError ? "input-styles-error" : "input-styles"
              }`}
              onChange={handleQuestionTitle}
            />
          </div>

          {/*  div for uploading image/document */}
          <div className="w-[149px] h-[120px] border border-secondary border-dashed flex items-center">
            <img
              src={PlusIcon}
              className="block mx-auto"
              onClick={handleFile}
            />
            <input
              type="file"
              ref={hiddenFile}
              style={{ display: "none" }}
              onChange={onFileChange}
            />
          </div>

          {/*  dropdown for choosing subject */}
          <div className="input-div-styles">
            {/*  label comp */}
            <Label label="Subject" />
            {/* dropdown comp */}
            <Dropdown subjectID_from_child_to_parent={handleSubject} />
          </div>

          {/*   question Type */}
          <div className="w-[480px] h-[100px] flex flex-col gap-y-1">
            {/* label comp */}
            <Label label="Question Type" />
            {/* radio button component */}
            {/* iterating queston type  (array of ques type with id i.e. [{ id : 1 , quesType:'short ans'} , {} , ..]) */}
            {questionType.map((item, i) => {
              return (
                <>
                  <Radio
                    radioSize="regular"
                    label={item.typeTitle}
                    group="type"
                    on_quesType_from_child_to_parent={handleType}
                    id={item.id}
                    selectedTypeId={quesData.questionTypeId}
                  />
                </>
              );
            })}
          </div>

          {/*  correct answer blocks */}
          {displayShortAnsBlock && (
            <ShortAns correct_ans_from_child={handleShortQA} />
          )}
          {displayCodeSnippetBlock && (
            <CodeSnippet correct_ans_from_child={handleCodeSnippet} />
          )}
          {displayMcqBlock && (
            <MultipleChoices options_from_child_to_parent={handleOptions} />
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {error && (
              <Alert
                alert_type={"error"}
                title={"Invalid"}
                description={error}
              />
            )}
            {submissionMessage && (
              <Alert
                alert_type="success"
                title="Success"
                description={submissionMessage}
              />
            )}
          </div>
        </form>
        {/* form ends here */}
        {/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        {/*  BUTTONS DIV */}

        {/*  div for cancel and add ques button */}
        <div className="w-[520px] h-[84px] p-5 flex justify-end">
          <div className="flex gap-x-4">
            {/* Button comp */}
            <Button
              button_type="tertiary"
              button_size="medium"
              text="Cancel"
              onclick={handleCancel}
              icon="none"
              src=""
            />

            <Button
              button_type="primary"
              button_size="medium"
              text="Add Question"
              onclick={handleAddQues}
              icon="left"
              src={PlusBig}
            />
          </div>
        </div>

        {addSuccessMessage && navigate("/questions")}
      </div>
      {/*   FORM DIV ends */}
      {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
    </>
  );
};

export default AddQues;
