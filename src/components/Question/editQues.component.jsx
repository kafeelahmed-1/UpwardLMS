import PlusIcon from "../../assets/plus.svg";
import Radio from "../Radio/radio.component";
import Button from "../Button/button.component";
import Dropdown from "../SubjectDropdown/dropdown.component";
import Label from "../Label/label.component";
import FormTitle from "../FormTitle/formTitle.component";
import CodeSnippet from "../CodeSnippet/codeSnippet.component";
import MultipleChoices from "../MultipleChoices/multipleChoices.component";
import ShortAns from "../ShortAnswer/shortAns.component";
import { useState, useEffect, useRef } from "react";
import CheckIconBig from "../../assets/checkIconBig.svg";
import AttachmentIcon from "../../assets/attachmentIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/alert.component";

const EditQues = ({ id, displayModalValue, refreshStudents }) => {
  //HOOKS
  const hiddenFile = useRef(null);

  //USE STATE HOOKS for managing data
  const [displayMcqBlock, setDisplayMcqBlock] = useState(false);
  const [displayShortAnsBlock, setDisplayShortAnsBlock] = useState(false);
  const [displayCodeSnippetBlock, setDisplayCodeSnippetBlock] = useState(false);
  const [error, setError] = useState("");

  //getting data from db and storing it the state
  const [quesDatabase, setQuesDatabase] = useState([]);
  // console.log(' edit PAYLOAD :' , quesDatabase);

  const [questionType, setQuestionType] = useState([]);
  /* console.log('question type data :' , questionType); */

  // console.log('edit success msg status :' , editSuccessMsg);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const navigate = useNavigate();

  //USE EFFECT HOOK for fetching data and setting it initially , setting states initially as well
  useEffect(() => {
    /* setDisplayMcqBlock(false);
    setDisplayShortAnsBlock(false);
    setDisplayCodeSnippetBlock(true); */
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Question/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setQuesDatabase(data.data))
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
      .catch((error) => setError("failed to get Question"));
  }, []);

  //FUNCTIONS
  //function for handling QUESTION TYPE i.e. short ans , code snippet , mcqs
  const handleType = (value, id) => {
    /*  here value has been passed from child comp (to parent comp) */

    setQuesDatabase({
      ...quesDatabase,
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
    console.log("BEFORE FETCH ");
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Question/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(quesDatabase),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setSubmissionMessage("Question updated successfully.");
          setError("");
        } else {
          setError("failed to update");
          setSubmissionMessage(""); // Set error message
        }
        refreshStudents();
      })
      .catch((e) => {
        setSubmissionMessage("");
        setError("Question is not updated....!");
      });
  };

  const handleCancel = () => {
    displayModalValue(false);
    navigate("/questions");
  };

  const handleQuestionTitle = (e) => {
    let value = e.target.value;
    setQuesDatabase({
      ...quesDatabase,
      questionTitle: value,
    });
  };

  const handleOptions = (value) => {
    console.log("handle options func", value);
    setQuesDatabase({
      ...quesDatabase,
      avlAnswer: value,
    });
  };

  const handleSubject = (id) => {
    console.log("subject is ", id);
    setQuesDatabase({
      ...quesDatabase,
      subjectId: id,
    });
  };

  const handleShortQA = (ans) => {
    console.log("CORRECT ANS , ", ans);
    setQuesDatabase({
      ...quesDatabase,
      correctAnswer: ans,
    });
  };

  const handleCodeSnippet = (code_ans) => {
    console.log("correct code :", code_ans);
    setQuesDatabase({
      ...quesDatabase,
      correctAnswer: code_ans,
    });
  };

  const onClose = (value) => {
    //value from child to parent
    console.log("boolean value from form title is :", value);
    displayModalValue(value);
  };

  const handleFile = () => {
    hiddenFile.current.click();
  };

  const onFileChange = (e) => {
    console.log("files ;", e.target.files[0].name);
    let fileName = e.target.files[0];

    const formData = new FormData();
    formData.append("file", fileName);

    fetch(`${process.env.REACT_APP_BASE_URL}/api/FileDocument/File`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA :", data, data.data, data.data.id);
        setQuesDatabase({
          ...quesDatabase,
          documentId: data.data.id,
        });
      })
      .catch((error) => console.error("Error:", error.message));
  };

  return (
    <>
      {/*  main div starts here */}
      <div className="edit-form-container-styles">
        {/*   TITLE OF FORM */}
        {/*  comp for form title */}
        <FormTitle title="Edit Question" formClosed={onClose} />

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        {/*  FORM */}

        {/* form-styles and input-div-styles are custom tailwindcss classes in index.css */}
        <form className="edit-form-styles">
          {/*  Question title field */}
          <div className="input-div-styles">
            <Label label="Question" />
            <div className="flex gap-x-4">
              <input
                type="text"
                placeholder="Question"
                className="edit-input-styles"
                onChange={handleQuestionTitle}
                value={quesDatabase.questionTitle}
              />
              <div className="self-center">
                <img
                  src={AttachmentIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={handleFile}
                />
                <input
                  type="file"
                  ref={hiddenFile}
                  style={{ display: "none" }}
                  onChange={onFileChange}
                />
              </div>
            </div>
          </div>

          {/*  dropdown for choosing subject */}
          <div className="input-div-styles">
            {/*  label comp */}
            <Label label="Subject" />
            {/* dropdown comp */}
            <Dropdown
              subjectID_from_child_to_parent={handleSubject}
              id={quesDatabase.subjectId}
            />
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
                    selectedTypeId={quesDatabase.questionTypeId}
                  />
                </>
              );
            })}
          </div>

          {/* ternary operator (ternary if else) */}
          {quesDatabase.questionTypeId === 3 || displayShortAnsBlock ? (
            <ShortAns correct_ans_from_child={handleShortQA} id_={id} />
          ) : quesDatabase.questionTypeId === 1 || displayMcqBlock ? (
            <MultipleChoices
              options_from_child_to_parent={handleOptions}
              id_={id}
            />
          ) : (
            <CodeSnippet correct_ans_from_child={handleCodeSnippet} id_={id} />
          )}
        </form>
        {/* form ends here */}
        {/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        {/*  BUTTONS DIV */}

        {/*  div for cancel and add ques button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {submissionMessage && (
            <Alert
              alert_type={"success"}
              title={"Success"}
              description={submissionMessage}
            />
          )}
          {error && (
            <Alert
              alert_type={"Invalid"}
              title={"Invalid"}
              description={error}
            />
          )}
        </div>
        <div className="w-[520px] h-[84px] p-5 flex justify-end">
          <div className="flex gap-x-4">
            {/*   Button comp */}
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
              text="Save Changes"
              onclick={handleAddQues}
              icon="left"
              src={CheckIconBig}
            />
          </div>

          {/* {editSuccessMsg && navigate("/questions")} */}
        </div>
      </div>
      {/*   main div ends */}
      {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
    </>
  );
};

export default EditQues;
