import React, { useState, useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";
import clockIcon from "../../assets/clock.svg";
import "../../index.css";

export const UserAssessment = () => {
  const { id } = useParams();
  const [showUserPopup, setShowUserPopup] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [assessmentName, setAssessmentName] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [showMessage, setShowMessage] = useState("");

  // const handleContinue = () => {
  //   setShowUserPopup(false);
  //   setStartTime(new Date());
  // };

  const handleNext = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };
  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        const currentTime = new Date();

        const elapsed = Math.round((currentTime - startTime) / 1000);

        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime]);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/AssessmentHead/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAssessmentName(data.data.title);
          setQuestions(data.data.assessmentQuestions);
        } else {
          console.error("Failed to fetch questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [id]);
  const remainingQuestions = questions.length - activeQuestionIndex;
  const handleInputChange = (event, questionId) => {
    const { value, type } = event.target;

    if (type === "textarea") {
      setUserAnswers((prevState) => ({
        ...prevState,
        [`answerValue${questionId}`]: value,
      }));
    } else if (type === "radio") {
      const { value } = event.target;

      setUserAnswers((prevState) => ({
        ...prevState,
        [`answerValue${questionId}`]: value,
      }));
    }
  };
  const handleCodeChange = (value, questionId) => {
    console.log(questionId);
    setUserAnswers((prevState) => ({
      ...prevState,
      [`answerValue${questionId}`]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const assessmentHeadResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/AssessmentHead/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!assessmentHeadResponse.ok) {
        throw new Error("Failed to fetch assessment head data");
      }
      const assessmentHeadData = await assessmentHeadResponse.json();

      const assessmentHeadId = assessmentHeadData.data.id;

      const userId = 2114;
      const studentId = 1058;
      const timeDuration = formatTime(elapsedTime);

      const payload = {
        userAssessmentHead: {
          assessmentHeadId: assessmentHeadId,
          userId: userId,
          note: "string",
          attemptDate: "2024-03-20T07:02:15.755Z",
          studentId: studentId,
          timeDuration: timeDuration,
        },
        userAssessmentDetail: questions.map((question, index) => ({
          assessmentHeadId: assessmentHeadId,
          assessmentQuestionId: question.id,
          questionId: question.questionId,
          answerValue: userAnswers[`answerValue${question.id}`] || "",
          createDate: "2024-03-20T07:02:15.755Z",
        })),
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/UserAssessmentHead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        showMessage("Assessment submitted successfully!");
      } else {
        console.error("Failed to submit assessment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  return (
    <>
      {/* {showUserPopup && (
        <div className="fixed inset-0  flex items-center justify-center">
          <div className="border border-secondary min-w-[520px] w-[fit-content] min-h-[252px] h-[fit-content] rounded-lg mx-auto">
         
            <div className="w-[520px] h-[60px] py-3 px-5 bg-[#F3F4F6] border border-b-secondary rounded-t-lg flex justify-between">
              <h4 className="self-center text-xl font-semibold">
                User Information
              </h4>
              <div className="self-center cursor-pointer">
        
              </div>
            </div>

         
            <div className="flex flex-col gap-y-4 pt-3 px-5 pb-8 text-base">
              <label className="text-xs text-textSecondary">
                Full Name<sup className="text-red-400">*</sup>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input-styles"
                name="title"
              />
              <label className="text-xs text-textSecondary">
                Email Address<sup className="text-red-400">*</sup>
              </label>
              <input
                type="text"
                placeholder="Email Address"
                className="input-styles"
                name="title"
              />
              <div className="flex gap-x-2 items-center"></div>
            </div>

            <div className="w-[520px] h-[84px] p-5 flex justify-end">
              <div
                style={{
                  background: "#182542",
                  width: 96,
                  height: 44,
                  borderRadius: 8,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button style={{ color: "#FFFFFF" }} onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Show the Assessment Name and Questions */}
      {showUserPopup && (
        <div
          style={{ backgroundColor: "#F3F4F6", height: "100%", width: "105%" }}
        >
          <div className="py-3 px-5 flex justify-center ">
            <p style={{ color: "#121826", fontSize: 32, fontWeight: 600 }}>
              {assessmentName}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              height: 32,

              borderRadius: 56,
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#182542",
            }}
          >
            <img src={clockIcon} />
            <p
              style={{ color: "#ffffff", textAlign: "center", paddingLeft: 10 }}
            >
              {" "}
              {formatTime(elapsedTime)}
            </p>
          </div>

          <Carousel
            className="react-responsive-carousel .slider "
            selectedItem={activeQuestionIndex}
            onChange={(index) => setActiveQuestionIndex(index)}
            showArrows={false}
            infiniteLoop={false}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
          >
            {questions.map((item, index) => (
              <div key={item.id}>
                <div
                  style={{
                    width: "60%",
                    minHeight: 200,
                    height: "fit-content",
                    backgroundColor: "#FFFFFF",
                    borderColor: "#D2D5DA",
                    borderRadius: 8,
                    margin: "auto",
                    marginTop: 25,
                    padding: 8,
                  }}
                >
                  <p>{item.questionDetail?.questionTitle}</p>
                  {item.questionDetail?.questionTypeDetail?.typeTitle ===
                    "Short Answer" && (
                    <textarea
                      placeholder="Your answer here..."
                      style={{
                        width: "100%",
                        height: "100px",
                        border: "1px solid #D2D5DA",
                        borderRadius: 8,
                        padding: 8,
                        marginTop: 20,
                      }}
                      name={`answer${item.id}`}
                      value={userAnswers[`answerValue${item.id}`] || ""}
                      onChange={(event) => handleInputChange(event, item.id)}
                    ></textarea>
                  )}
                  {item.questionDetail?.questionTypeDetail?.typeTitle ===
                    "Multiple Choice" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: 10,
                        marginTop: 20,
                      }}
                    >
                      {item.questionDetail.avlAnswer.map(
                        (option, optionIndex) => (
                          <label
                            key={optionIndex}
                            style={{ marginBottom: "8px" }}
                          >
                            <input
                              type="radio"
                              name={`answer${item.id}`}
                              value={option.answerText}
                              style={{ marginRight: 10 }}
                              onChange={(event) =>
                                handleInputChange(event, item.id)
                              }
                            />
                            {option.answerText}
                          </label>
                        )
                      )}
                    </div>
                  )}
                  {item.questionDetail?.questionTypeDetail?.typeTitle ===
                    "Code Snippet" && (
                    <AceEditor
                      mode="javascript"
                      theme="textmate"
                      name={`code-editor${item.id}`}
                      setOptions={{ useWorker: false }}
                      editorProps={{ $blockScrolling: true }}
                      width="100%"
                      height="180px"
                      fontSize="12px"
                      marginTop="30px"
                      className="border border-secondary rounded-lg"
                      onChange={(value) => handleCodeChange(value, item.id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </Carousel>

          <div
            style={{
              position: "absolute",
              bottom: "15%",
              left: "50%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: 30,
              }}
            >
              <p> {remainingQuestions} questions remaining</p>
            </div>

            <button
              style={{
                marginRight: 30,
                padding: "8px 20px",
                backgroundColor:
                  activeQuestionIndex === 0 ? "#FFFFFF" : "#182542",
                color: activeQuestionIndex === 0 ? "#121826" : "#FFFFFF",
                borderRadius: 8,
                border: "1px solid #182542",
                cursor: "pointer",
                width: 140,
                height: 44,
              }}
              onClick={handlePrevious}
              disabled={activeQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              style={{
                padding: "8px 20px",
                backgroundColor:
                  activeQuestionIndex === questions.length - 1
                    ? "#FFFFFF"
                    : "#182542",
                color:
                  activeQuestionIndex === questions.length - 1
                    ? "#121826"
                    : "#FFFFFF",
                borderRadius: 8,
                border: "1px solid #182542",
                cursor: "pointer",
                width: 140,
                height: 44,
              }}
              onClick={handleNext}
              disabled={activeQuestionIndex == questions.length - 1}
            >
              Next
            </button>
          </div>
          <div>
            {" "}
            {remainingQuestions == 1 && (
              <div
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#182542",
                  color: "#FFFFFF",
                  borderRadius: 8,
                  border: "1px solid #182542",
                  cursor: "pointer",
                  width: 140,
                  height: 44,
                  backgroundColor: "#182542",
                  color: "#FFFFFF",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "10%",
                  marginTop: "18%",
                }}
              >
                <button onClick={handleSubmit}>Submit</button>
              </div>
            )}
            <div
              style={{
                color: "green",
              }}
            >
              {" "}
              {showMessage && <p>{showMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
