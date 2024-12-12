import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FormTitle from "../FormTitle/formTitle.component";
import Label from "../Label/label.component";
import Button from "../Button/button.component";
import PlusBig from "../../assets/PlusBig.svg";
import FileDocument from "../../routes/Assessment/FileDocument";
import Alert from "../Alert/alert.component";
import UpdateFile from "../../routes/Assessment/UpdateFile";
const EditStudent = ({ closeEditStudentForm, refreshStudents }) => {
  const { id } = useParams();
  console.log("id for updating student is :", id);

  const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState({});
  console.log("student EDIT INFO :", studentInfo);

  const [createUser, setCreateUser] = useState(false);
  // console.log("create user status :", createUser);
  const [error, setError] = useState("");

  const [userOnEdit, setUserOnEdit] = useState(false);
  console.log("USER ON EDIT :", userOnEdit);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [allFieldsError, setAllFieldsError] = useState(false);

  const statusOptions = [
    "New Registration",
    "Site Registration",
    "Assessment Assigned",
    "Assessment Performed",
    "Assessment Not Performed",
    "Pre Enrollment Evaluation",
    "Technical Evaluation",
    "Rejected",
    "Selected",
  ];


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Students/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStudentInfo(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  console.log("IS USER CURRENTLY :", studentInfo.isUser);
  const onClose = () => {
    closeEditStudentForm(false);
    navigate("/students");
  };

  const handleStudentName = (e) => {
    setStudentInfo({
      ...studentInfo,
      studentName: e.target.value,
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

  const handleGender = (e) => {
    setStudentInfo({
      ...studentInfo,
      gender: e.target.value,
    });
  };

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

  const handleStatus = (e) => {
    setStudentInfo({
      ...studentInfo,
      status: e.target.value,
    });
  };

  const handleExperience = (e) => {
    setStudentInfo({
      ...studentInfo,
      experience: e.target.value,
    });
  };
  const handleResumeUpload = (e) => {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${process.env.REACT_APP_BASE_URL}/api/FileDocument/File`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload file");
        }
        return response.json();
      })
      .then((data) => {
        // Update studentInfo with the received resumeDocumentId
        setStudentInfo((prevStudentInfo) => ({
          ...prevStudentInfo,
          resumeDocumentId: data.data.id,
        }));
        console.log(
          "File uploaded successfully. ResumeDocumentId:",
          data.data.id
        );
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleNote = (e) => {
    setStudentInfo({
      ...studentInfo,
      note: e.target.value,
    });
  };

  const handleCreateUser = (e) => {
    if (e.target.checked) {
      console.log("CHECKED:");
      setStudentInfo({
        ...studentInfo,
        isUser: true,
      });
      // setCreateUser(true);
      // console.log('user email :' , studentInfo.user.userEmail);
      // console.log('user password : ' , studentInfo.user.userPassword);

      if (
        studentInfo.user.userEmail == "" &&
        studentInfo.user.userPassword == ""
      ) {
        console.log("check now");
        setCreateUser(false);
        setUserOnEdit(true);
        setStudentInfo({
          ...studentInfo,
          isUser: true,
        });
      } else {
        setCreateUser(true);
        setUserOnEdit(false);
      }
    } else {
      console.log("UNCHECKED:");
      setCreateUser(false);
      setUserOnEdit(false);
      setStudentInfo({
        ...studentInfo,
        isUser: false,
      });
    }
  };

  const handleUserEmail = (e) => {
    setStudentInfo({
      ...studentInfo,
      user: {
        ...studentInfo.user,
        userEmail: e.target.value,
      },
    });
  };

  const handleUserPassword = (e) => {
    setStudentInfo({
      ...studentInfo,
      user: {
        ...studentInfo.user,
        userPassword: e.target.value,
      },
    });
  };

  const onUpdateStudentData = async () => {
    try {
      const token = localStorage.getItem("token");
      const requiredFields = [
        "studentName",
        "fatherName",
        "contactNumber",
        "emailAddress",
      ];
      const emptyFields = requiredFields.filter((field) => !studentInfo[field]);

      if (emptyFields.length > 0) {
        setSubmissionMessage(`Enter Required Field..........!`);
        setAllFieldsError(true);
        return;
      }

      const studentResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/Student/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentInfo),
        }
      );

      if (!studentResponse.ok) {
        throw new Error("Failed to update student data");
      }

      // Check if the file has been changed before attempting to upload
      if (
        studentInfo.resumeDocumentDetail &&
        studentInfo.resumeDocumentDetailChanged
      ) {
        // If a new file is uploaded, update the file
        const formData = new FormData();
        formData.append("file", studentInfo.resumeDocumentDetail);

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
        const resumeDocumentId = fileData.data.id;

        setStudentInfo({
          ...studentInfo,
          resumeDocumentId: resumeDocumentId,
        });
      }

      setSubmissionMessage("Student data updated successfully.");
      refreshStudents();
      setError("");
    } catch (error) {
      console.error("Error updating student data:", error);
      setSubmissionMessage("");
      setError("Failed to update student data.");
    }
  };

  const handleFileDelete = () => {
    const token = localStorage.getItem("token");
    const fileId = studentInfo.resumeDocumentDetail.id;

    // Delete file from FileDocument
    fetch(`${process.env.REACT_APP_BASE_URL}/api/FileDocument/File/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete file from FileDocument");
        }
        return response.json();
      })
      .then((data) => {
        console.log("File deleted from FileDocument:", data);
      })
      .catch((error) => {
        console.error("Error deleting file from FileDocument:", error);
      });

    // Update studentInfo to remove resumeDocumentDetail and resumeDocumentId
    setStudentInfo((prevStudentInfo) => ({
      ...prevStudentInfo,
      resumeDocumentDetail: null,
      resumeDocumentId: null,
    }));
  };

  const handleCancel = () => {
    closeEditStudentForm(false);
    navigate("/students");
  };

  return (
    <>
      <div className="form-container-styles">
        {/*   TITLE OF FORM */}
        {/*  comp for form title */}
        <FormTitle title="Edit Candidate" formClosed={onClose} />

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/*  FORM */}
        {/* form-styles and input-div-styles are custom tailwindcss classes in index.css */}

        <form className="form-styles">
          {/* Student Name field */}
          <div className="input-div-styles">
            <Label label="Name" />
            <input
              type="text"
              placeholder="Name"
              value={studentInfo.studentName}
              className={`${
                allFieldsError ? "input-styles-error" : "input-styles"
              }`}
              onChange={handleStudentName}
            />
          </div>

          {/* Father Name field */}
          <div className="input-div-styles">
            <Label label="Father's Name" />
            <input
              type="text"
              placeholder="Father's Name"
              value={studentInfo.fatherName}
              className={`${
                allFieldsError ? "input-styles-error" : "input-styles"
              }`}
              onChange={handleFatherName}
            />
          </div>

          {/* City field */}
          <div className="input-div-styles">
            <Label label="City" />
            <input
              type="text"
              placeholder="City"
              value={studentInfo.city}
              className="input-styles"
              onChange={handleCity}
            />
          </div>

          {/* Phone field */}
          <div className="input-div-styles">
            <Label label="Phone" />
            <input
              type="text"
              placeholder="123456789"
              value={studentInfo.contactNumber}
              className={`${
                allFieldsError ? "input-styles-error" : "input-styles"
              }`}
              onChange={handleContact}
            />
          </div>

          {/* Gender field */}
          <div className="input-div-styles">
            <Label label="Gender" />
            <input
              type="text"
              placeholder="Gender"
              value={studentInfo.gender}
              className="input-styles"
              onChange={handleGender}
            />
          </div>

          {/* Email Address field */}
          <div className="input-div-styles">
            <Label label="Email Address" />
            <input
              type="text"
              placeholder="abc@gmail.com"
              value={studentInfo.emailAddress}
              className={`${
                allFieldsError ? "input-styles-error" : "input-styles"
              }`}
              onChange={handleEmailAddress}
            />
          </div>

          {/* CNIC field */}
          <div className="input-div-styles">
            <Label label="CNIC" />
            <input
              type="text"
              placeholder="13503-4745451-2"
              value={studentInfo.cnic}
              className="input-styles"
              onChange={handleCnic}
            />
          </div>

         
          {/* Status field */}
          <div className="input-div-styles">
            <label className="text-xs text-textSecondary flex gap-x-1">
              {"Status"}
            </label>
            <select
              value={studentInfo.status}
              onChange={handleStatus}
              className="input-styles"
            >
              <option value="" disabled selected>
                Select Status
              </option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Qualification field */}
          <div className="input-div-styles">
            <Label label="Qualification" />
            <input
              type="text"
              placeholder="qualification"
              value={studentInfo.qualification}
              className="input-styles"
              onChange={handleQualification}
            />
          </div>

          {/* Area of Interest field */}
          <div className="input-div-styles">
            <Label label="Area of Interest" />
            <input
              type="text"
              placeholder="for example Computer Science"
              value={studentInfo.areaOfInterest}
              className="input-styles"
              onChange={handleAreaOfInterest}
            />
          </div>

          {/* Experience field */}
          <div className="input-div-styles">
            <Label label="Experience" />
            <input
              type="text"
              placeholder="Experience"
              value={studentInfo.experience}
              className="input-styles"
              onChange={handleExperience}
            />
          </div>

          {/* Resume field */}
          <div>
            {studentInfo.resumeDocumentDetail ? (
              <UpdateFile
                fileId={studentInfo.resumeDocumentDetail.id}
                fileName={studentInfo.resumeDocumentDetail.sourceFileName}
                onDelete={handleFileDelete}
              />
            ) : (
              <div>
                <Label label="Resume" />
                <input
                  className="input-styles"
                  type="file" // Change input type to "file"
                  onChange={handleResumeUpload} // Add onChange event handler to handle file selection
                />
              </div>
            )}
          </div>

          {/* Note field */}
          <div className="input-div-styles">
            <Label label="Note" />
            <input
              type="text"
              placeholder="Note"
              value={studentInfo.note}
              className="input-styles"
              onChange={handleNote}
            />
          </div>

          {/* Create User field */}
          {studentInfo.isUser &&
          studentInfo.user.userEmail != "" &&
          studentInfo.user.userPassword != "" ? (
            <div className="flex gap-x-1.5 items-center">
              <input
                type="checkbox"
                className="w-4 h-4 border border-Secondary outline-none"
                id="user"
                checked="true"
              />
              <label htmlFor="user" className="text-sm">
                Create User
              </label>
            </div>
          ) : (
            <div className="flex gap-x-1.5 items-center">
              <input
                type="checkbox"
                className="w-4 h-4 border border-Secondary outline-none"
                id="user"
                onChange={handleCreateUser}
              />
              <label htmlFor="user" className="text-sm">
                Create User
              </label>
            </div>
          )}

          {/* create user div */}
          {studentInfo.isUser && !userOnEdit && (
            <>
              {/* <p>MJE HI TAKLEEF HAI</p> */}
              <div className="flex flex-col gap-y-1">
                <div className="input-div-styles">
                  <Label label="Email" />
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={studentInfo.user.userEmail}
                    className="input-styles"
                    //  onChange={handleUserEmail}
                    readOnly
                  />
                </div>
                <div className="input-div-styles">
                  <Label label="Password" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={studentInfo.user.userPassword}
                    className="input-styles"
                    //  onChange={handleUserPassword}
                    readOnly
                  />
                </div>
              </div>
            </>
          )}

          {studentInfo.isUser && userOnEdit && (
            <>
              {/* <p>MAAF KRO</p> */}
              <div className="flex flex-col gap-y-1">
                <div className="input-div-styles">
                  <Label label="Email" />
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={studentInfo?.user?.userEmail}
                    className="input-styles"
                    onChange={handleUserEmail}
                  />
                </div>
                <div className="input-div-styles">
                  <Label label="Password" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={studentInfo?.user?.userPassword}
                    className="input-styles"
                    onChange={handleUserPassword}
                  />
                </div>
              </div>
            </>
          )}

          {!studentInfo.isUser && (
            <>
              <div style={{ display: createUser ? "block" : "none" }}>
                <div className="flex flex-col gap-y-1">
                  <div className="input-div-styles">
                    <Label label="Email" />
                    <input
                      type="text"
                      placeholder="Email Address"
                      value={studentInfo?.user?.userEmail}
                      className="input-styles"
                      onChange={handleUserEmail}
                    />
                  </div>
                  <div className="input-div-styles">
                    <Label label="Password" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={studentInfo?.user?.userPassword}
                      className="input-styles"
                      onChange={handleUserPassword}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {submissionMessage && !allFieldsError && (
            <Alert
              alert_type="successLight"
              title="Success"
              description={submissionMessage}
            />
          )}
          {allFieldsError && (
            <Alert
              alert_type="errorLight"
              title="Invalid Information"
              description="fields are required "
            />
          )}
        </div>

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
              text="Edit Candidate"
              onclick={onUpdateStudentData}
              icon="left"
              src={PlusBig}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStudent;
