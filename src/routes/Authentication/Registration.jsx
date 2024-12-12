import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Label from "../../components/Label/label.component";
// import FormTitle from "../FormTitle/formTitle.component";
import FormTitle from "../../components/FormTitle/formTitle.component";
// import Button from "../Button/button.component";
import Button from "../../components/Button/button.component";
import PlusBig from "../../assets/PlusBig.svg";

import Alert from "../../components/Alert/alert.component";

const Registration = ({ closeAddStudentForm, refreshStudents }) => {
  const navigate = useNavigate();

  const [createUser, setCreateUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [error, setError] = useState("");
  const [allFieldsError, setAllFieldsError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  // console.log("all fields error initially :", allFieldsError);

  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    fatherName: "",
    contactNumber: "",
    emailAddress: "",
    city: "",
    cnic: "",
    experience: "",
    note: "",
    gender: "",
    qualification: "",
    resumeDocumentId: 0,
    resumeDocumentDetail: null,
    status: "New Registration",
    areaOfInterest: "",
    userId: 0,
    isUser: false,
    user: {
      id: 0,
      userEmail: "",
      userPassword: "",
      userStatus: 1,
    },
  });

  const [userInfo, setUserInfo] = useState({
    userEmail: "",
    userPassword: "",
    userStatus: 1,
  });
  // console.log("user info object :" , userInfo);

  // const [ studentSuccess , setStudentSuccess ] = useState(false);
  // console.log("student success status : " , studentSuccess);

  const [userSuccessData, setUserSuccessData] = useState({});
  const [selectedBackground, setSelectedBackground] = useState("");

  const availableCourses = {
    "Computer Science": [
      ".Net,React,SQL",
      "Networking",
      "Data Science",
      "React Native",
      "Flutter",
    ],
    "Non-Technical": [
      "Project Management",
      "Graphic Designing",
      "Digital Marketing",
      "Content Writing",
      "SEO",
    ],
  };

  //   const onClose = () => {
  //     closeAddStudentForm(false);
  //     navigate("/students");
  //   };

  const handleCancel = () => {
    navigate("/");
  };
  const handleStudentName = (e) => {
    setStudentInfo({
      ...studentInfo,
      studentName: e.target.value,
    });
  };
  const handleBackgroundChange = (e) => {
    setSelectedBackground(e.target.value);
    setStudentInfo({
      ...studentInfo,
      areaOfInterest: "",
    });
  };

  const handleFatherName = (e) => {
    setStudentInfo({
      ...studentInfo,
      fatherName: e.target.value,
    });
  };

  const handleContact = (e) => {
    setStudentInfo({
      ...studentInfo,
      contactNumber: e.target.value,
    });
  };

  // const genderOptions = ["Male", "Female", "Others"];

  // // Handle change in gender selection
  // const handleGenderChange = (e) => {
  //   setStudentInfo({
  //     ...studentInfo,
  //     gender: e.target.value,
  //   });
  // };

  const handleEmailAddress = (e) => {
    setStudentInfo({
      ...studentInfo,
      emailAddress: e.target.value,
    });
  };

  const handleCnic = (e) => {
    setStudentInfo({
      ...studentInfo,
      cnic: e.target.value,
    });
  };

  const handleQualification = (e) => {
    setStudentInfo({
      ...studentInfo,
      qualification: e.target.value,
    });
  };

  const handleAreaOfInterest = (e) => {
    setStudentInfo({
      ...studentInfo,
      areaOfInterest: e.target.value,
    });
  };

  const handleCity = (e) => {
    setStudentInfo({
      ...studentInfo,
      city: e.target.value,
    });
  };

  // const handleStatus = (e) => {
  //   setStudentInfo({
  //     ...studentInfo,
  //     status: e.target.value,
  //   });
  // };

  const handleExperience = (e) => {
    setStudentInfo({
      ...studentInfo,
      experience: e.target.value,
    });
  };

  const handleNote = (e) => {
    setStudentInfo({
      ...studentInfo,
      note: e.target.value,
    });
  };
  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Selected file:", file);
      setStudentInfo({
        ...studentInfo,
        resumeDocumentDetail: e.target.files[0],
      });
    } else {
      setStudentInfo({
        ...studentInfo,
        resumeDocumentDetail: null,
        resumeDocumentId: 0,
      });
    }
  };

  const handleCreateUser = (e) => {
    if (e.target.checked) {
      // console.log("status : checked");
      setCreateUser(true);
      setStudentInfo({
        ...studentInfo,
        isUser: true,
      });
    } else {
      // console.log("status : unchecked");
      setCreateUser(false);
      setStudentInfo({
        ...studentInfo,
        isUser: false,
      });
    }
  };

  // const handleUserEmail = (e) => {
  //   setStudentInfo({
  //     ...studentInfo,
  //     user: {
  //       ...studentInfo.user,
  //       userEmail: e.target.value,
  //     },
  //   });
  // };

  // const handleUserPassword = (e) => {
  //   setStudentInfo({
  //     ...studentInfo,
  //     user: {
  //       ...studentInfo.user,
  //       userPassword: e.target.value,
  //     },
  //   });
  // };
  // const handleEducationalBackground = (e) => {
  //   setStudent({
  //     ...student,
  //     educationalBackground: e.target.value,
  //   });
  // };

  const onSubmitStudentData = async () => {
    const token = localStorage.getItem("token");
    const requiredFields = [
      "studentName",
      "fatherName",
      "contactNumber",
      "emailAddress",
    ];
    const emptyFields = requiredFields.filter((field) => !studentInfo[field]);

    if (emptyFields.length > 0) {
      setSubmissionMessage("");
      setError("Enter Required Field..........!");
      setAllFieldsError(true);

      return;
    }

    try {
      let resumeDocumentId = 0;

      // If a document is provided, upload it first
      if (studentInfo.resumeDocumentDetail) {
        const formData = new FormData();
        formData.append("file", studentInfo.resumeDocumentDetail);

        // Upload file
        const fileUploadResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/FileDocument/File`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!fileUploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const fileData = await fileUploadResponse.json();
        resumeDocumentId = fileData.data.id;
      }

      // Include resumeDocumentId in the studentInfo
      const updatedStudentInfo = {
        ...studentInfo,
        resumeDocumentId: resumeDocumentId,
      };

      // Send student data to server
      const studentResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/Student`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedStudentInfo),
        }
      );

      if (!studentResponse.ok) {
        setError("Failed to add student data");
        setSubmissionMessage("");
      }
      const responseData = await studentResponse.json();
      console.log("response data", responseData);
      // Check if userId is available in the response
      if (responseData.userId) {
        // If userId is available, set it in the studentInfo
        updatedStudentInfo.userId = responseData.userId;
      }

      setStudentInfo({
        ...updatedStudentInfo,
        studentName: "",
        fatherName: "",
        contactNumber: "",
        emailAddress: "",
        city: "",
        cnic: "",
        experience: "",
        note: "",
        gender: "",
        qualification: "",
        status: "New Registration",
        areaOfInterest: "",
      });
      setSubmissionMessage("Student data submitted successfully!");
      console.log(studentInfo);
      setError("");
      setAllFieldsError(false);
      setFormSubmitted(true);
      refreshStudents();
    } catch (error) {
      console.error("Error adding student data:", error);
      setSubmissionMessage("Registration successfully");
      navigate("/");
    }
  };

  return (
    <>
      <div className="Registration-form-container-styles">
        <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
          <h1 style={{ color: "#6C727F", fontSize: 24, fontWeight: "400" }}>
            Registration
          </h1>
        </div>
        {/*   TITLE OF FORM */}
        {/*  comp for form title */}
        {/* <FormTitle title="Add Student" formClosed={onClose} /> */}

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/*  FORM */}
        {/* form-styles and input-div-styles are custom tailwindcss classes in index.css */}
        <form className="form-styles">
          {/* Student Name field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Name"}
              <sup className="text-error text-sm">*</sup>
            </label>
            <input
              type="text"
              placeholder="Name"
              value={studentInfo.studentName}
              className={`${
                allFieldsError
                  ? "input-styles-error"
                  : "Registration-input-styles"
              }`}
              onChange={handleStudentName}
            />
          </div>

          {/* Father Name field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Father's Name"}
              <sup className="text-error text-sm">*</sup>
            </label>
            <input
              type="text"
              placeholder="Father's Name"
              value={studentInfo.fatherName}
              className={`${
                allFieldsError
                  ? "input-styles-error"
                  : "Registration-input-styles"
              }`}
              onChange={handleFatherName}
            />
          </div>

          {/* City field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"City"}
            </label>
            <input
              type="text"
              placeholder="City"
              value={studentInfo.city}
              className="Registration-input-styles"
              onChange={handleCity}
            />
          </div>

          {/* Phone field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Phone"}
              <sup className="text-error text-sm">*</sup>
            </label>
            <input
              type="text"
              placeholder="123456789"
              value={studentInfo.contactNumber}
              className={`${
                allFieldsError
                  ? "input-styles-error"
                  : "Registration-input-styles"
              }`}
              onChange={handleContact}
            />
          </div>

          {/* Gender field */}
          {/* <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Gender"}
            </label>
            <select
              value={studentInfo.gender}
              onChange={handleGenderChange}
              className="input-styles"
            >
              <option value="" disabled selected>
                Select Gender
              </option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div> */}

          {/* Email Address field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Email Address"}
              <sup className="text-error text-sm">*</sup>
            </label>
            <input
              type="text"
              placeholder="abc@gmail.com"
              value={studentInfo.emailAddress}
              className={`${
                allFieldsError
                  ? "input-styles-error"
                  : "Registration-input-styles"
              }`}
              onChange={handleEmailAddress}
            />
          </div>

          {/* CNIC field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"CNIC"}
            </label>
            <input
              type="text"
              placeholder="13503-4745451-2"
              value={studentInfo.cnic}
              className="Registration-input-styles"
              onChange={handleCnic}
            />
          </div>

          {/* Status field */}
          {/* <div className="input-div-styles">
            <Label label="Status" />
            <input
              type="text"
              placeholder="Status"
              value={studentInfo.status}
              className="input-styles"
              onChange={handleStatus}
            />
          </div> */}

          {/* Qualification field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Qualification (Degree)"}
            </label>
            <input
              type="text"
              placeholder="qualification"
              value={studentInfo.qualification}
              className="Registration-input-styles"
              onChange={handleQualification}
            />
          </div>

          {/* Area of Interest field */}
          {/* Area of Interest field */}
          {/* <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Area of Interest"}
            </label>
            <input
              type="text"
              placeholder="for example Computer Science"
              value={studentInfo.educationalBackground}
              className="input-styles"
              onChange={handleEducationalBackground}
            />
          </div> */}

          {/* Render available courses based on educational background */}

          <label className="text-xs text-textSecondary flex gap-x-1 font-bold">
            {"Educational Background"}
          </label>

          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="radio"
                id="computerScience"
                value="Computer Science"
                checked={selectedBackground === "Computer Science"}
                onChange={handleBackgroundChange}
              />
              <label
                htmlFor="computerScience"
                className="text-xs text-textSecondary  font-bold p-3"
              >
                ICT (Major:ComputerScience)
              </label>
            </div>
            <div
              style={{
                paddingLeft: 25,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                type="radio"
                id="nonTechnical"
                value="Non-Technical"
                checked={selectedBackground === "Non-Technical"}
                onChange={handleBackgroundChange}
              />
              <label
                htmlFor="nonTechnical"
                className="text-xs text-textSecondary  font-bold mt-3 ps-3 "
              >
                Non-ICT(Major:No ComputerScience)
              </label>
            </div>
          </div>

          {/* Render courses based on the selected background */}
          {selectedBackground && (
            <div className="input-div-styles">
              <label className="text-xs text-textSecondary flex gap-x-1">
                {"Area of Interest"}
              </label>
              <select
                value={studentInfo.areaOfInterest}
                onChange={handleAreaOfInterest}
                className="Registration-input-styles"
              >
                <option value="" disabled>
                  Select Course
                </option>
                {availableCourses[selectedBackground].map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Experience field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Experience"}
            </label>
            <input
              type="text"
              placeholder="Experience"
              value={studentInfo.experience}
              className="Registration-input-styles"
              onChange={handleExperience}
            />
          </div>

          {/* Resume field */}
          <div>
            <label className="text-xs text-textSecondary flex gap-x-1 font-bold">
              {"Resume"}
            </label>
            <input
              className="Registration-input-styles"
              type="file" // Change input type to "file"
              onChange={handleResumeChange} // Add onChange event handler to handle file selection
            />
          </div>

          {/* Note field */}
          <div>
            <label className="text-xs text-textSecondary flex gap-x-1 font-bold">
              {"Note"}
            </label>
            <textarea
              style={{ height: "100%" }}
              type="text"
              placeholder="Note"
              value={studentInfo.note}
              className="Registration-input-styles"
              onChange={handleNote}
            />
          </div>

          {/* Create User field */}
          {/* <div className="flex gap-x-1.5 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 border border-Secondary outline-none"
              id="user"
              onChange={handleCreateUser}
            />
            <label htmlFor="user" className="text-sm">
              Create User
            </label>
          </div> */}

          {/* create user div */}
          {/* <div style={{ display: createUser ? "block" : "none" }}>
            <div className="flex flex-col gap-y-1">
              <div className="input-div-styles">
                <label className="text-xs text-textSecondary flex gap-x-1">
                  {"Email"}
                  <sup className="text-error text-sm">*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Email Address"
                  value={studentInfo.user.userEmail}
                  className={`${
                    allFieldsError ? "input-styles-error" : "input-styles"
                  }`}
                  onChange={handleUserEmail}
                />
              </div>
              <div className="input-div-styles">
                <label className="text-xs text-textSecondary flex gap-x-1 mt-3">
                  {"password"}
                  <sup className="text-error text-sm">*</sup>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={studentInfo.user.userPassword}
                  className={`${
                    allFieldsError ? "input-styles-error" : "input-styles"
                  }`}
                  onChange={handleUserPassword}
                />
              </div>
            </div>
          </div> */}
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          {formSubmitted && (
            <Alert
              alert_type="success"
              title="Success"
              description={submissionMessage}
            />
          )}
          {allFieldsError && (
            <Alert
              alert_type="errorLight"
              title="Invalid Information"
              description="Fields are required"
            />
          )}
        </div>

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/*  BUTTONS DIV */}
        {/*  div for cancel and add ques button */}
        <div className="w-[600px] h-[84px] p-5 flex justify-end">
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
              text="Register"
              onclick={onSubmitStudentData}
              icon="left"
              src={PlusBig}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
