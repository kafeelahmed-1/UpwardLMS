import FormTitle from "../FormTitle/formTitle.component";
import Button from "../Button/button.component";
import WhiteTrashIcon from "../../assets/whiteTrashIcon.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/alert.component";

const DeleteStudentPopup = ({ onClose, deleteId, refreshStudents , onDelete }) => {
  // console.log("delete id :", deleteId);
  // console.log("on delete :" , onDelete);

  const [studentInfo, setStudentInfo] = useState([]);
  // console.log('student Info from delete popup :' , studentInfo);
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Students/${deleteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStudentInfo(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleClosePopup = (value) => {
    onClose(value);
  };


  //DELETE STUDENT
  const handleDeleteStudent = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/Student/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(studentInfo),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          console.log("student deleted successfully");
          onDelete(response.success);
          
          setTimeout(() => {
            navigate("/students");
          } , 4000)

          setDeleteSuccess(true);
          setAlertMessage("Student record deleted successfully!");
          setError("");
        } else {
          setDeleteSuccess(false);
          setAlertMessage("");
          setError(
            "Before deleting this student, please delete their associated assessment record."
          );
        }
        refreshStudents();
      })
      .catch((error) => {
        setDeleteSuccess(false);
        setAlertMessage("");
        setError("Failed to delete student record.");
      });
  };

  const handleCancel = () => {
    navigate("/students");
    onClose(false);
  };

  // if (deleteSuccess) {
  //   alert('student record deleted successfully!');
  //   navigate("/students");
  //   onClose(false);
  // }

  return (
    <>
      <div className="border border-secondary w-[520.5px] min-h-[252px] h-[fit-content] rounded-lg mx-auto bg-white">
        {/* div 1 : FORM TITLE*/}
        <FormTitle title="Delete Candidate?" formClosed={handleClosePopup} />

        {/* div 2 : CONTENT BODY */}
        <div className="flex flex-col gap-y-6 pt-3 px-5 pb-8 text-base">
          <p>
            Deleting this student will remove all their data permanently. Are
            you absolutely sure you want to delete?
          </p>
          <p>This action is irreversible.</p>
          {/* <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              className="w-5 h-5 border-2 border-secondary"
            />
            <label>Don't Ask again</label>
          </div> */}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {alertMessage && (
            <Alert
              alert_type={"success"}
              title={"Success"}
              description={alertMessage} 
            />
          )}
          {error && (
            <Alert alert_type={"error"} title={"Invalid"} description={error} />
          )}
        </div>
        {/*  DIV 3 : BUTTONS DIV */}
        <div className="w-[520px] h-[84px] p-5 flex justify-end">
          <div className="flex gap-x-4">
            {/* Button comp : cancel button*/}
            <Button
              button_type="tertiary"
              button_size="medium"
              text="Cancel"
              onclick={handleCancel}
              icon="none"
              src=""
            />
            {/* Button comp : Add more questions div */}
            <Button
              button_type="delete"
              button_size="medium"
              text="Delete Candidate"
              onclick={handleDeleteStudent}
              icon="left"
              src={WhiteTrashIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteStudentPopup;
