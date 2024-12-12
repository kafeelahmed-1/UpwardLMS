import React, { useState, useEffect } from "react";
import { useParams , Link , useNavigate} from "react-router-dom";
import Button from "../../components/Button/button.component";
import EditIcon from "../../assets/editIcon.svg";
import TrashIcon from "../../assets/trash.svg";
import Alert from "../../components/Alert/alert.component"; // Import your Alert component
import Label from "../../components/Label/label.component";
import Modal from 'react-modal';
import DeleteEnrollment from "../Enrollment/deleteEnrollment.component";
import DelSuccess from "../../components/DeleteSuccessPopup/delSuccess.component";



export const StudentEnrollment = () => {

  // console.log("STUDENT ID :" , studentId);
  const {id} = useParams();
      const navigate = useNavigate();
  console.log("SE params" . id);
  // console.log("SE " ,studentId);

  const [values, setValues] = useState({
    Batch: "",
    Course: "",
    startDate: "",
    enrollmentStatus: "",
    StudentId: 0,
  });
  const [Batch, setBatch] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [students , setStudents] = useState([]);
  console.log("stuents from enrollment comp :" , students);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [allFieldsError, setAllFieldsError] = useState(false);
  const [deleteSuccess , setDeleteSuccess] = useState(false);
  const [displayDelEnrollmentModal , setDisplayDelEnrollmentModal] = useState(false);



  useEffect(() => {
   

    fetchStudentData();
    fetchCourse();
    fetchEnrollments();
  }, [id]);

  const fetchEnrollments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/StudentEnrollment/Student/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setEnrollments(result.data);
        // console.log(result.data);
      } else {
        console.error("Failed to fetch enrollments from API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const fetchBatches = async (courseId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/Batches/Course/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setBatch(result.data);
      } else {
        console.error("Failed to fetch batches from API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const fetchStudentData = async () => {
    const token = localStorage.getItem("token");
    console.log("id student enrollment, fetching student data" , id);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/Students/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setStudents(result.data);
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const fetchCourse = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/Course?pageIndex=0&pageSize=123`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setCourses(result.data);
      } else {
        console.error("Failed to fetch categories from API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === "Course") {
      fetchBatches(value); //pass the id as value to function
    }
  };

  const validateFields = () => {
    const requiredFields = ["Course", "Batch", "enrollmentStatus"];
    const emptyFields = requiredFields.filter((field) => !values[field]);

    if (emptyFields.length > 0) {
      setSubmissionMessage("Please fill out all required fields.");
      setAllFieldsError(true);
      return false;
    }
    setAllFieldsError(false);
    return true;
  };

  const handleClick = async () => {
    if (!validateFields()) {
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
      batchId: values.Batch,
      courseId: values.Course,
      enrollmentStatus: values.enrollmentStatus,
      StudentId: id,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/StudentEnrollment`,
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
        setValues({
          Batch: "",
          Course: "",
          startDate: "",
          enrollmentStatus: "",
        });
        setSubmissionMessage("Enrollment added successfully!");
        setTimeout(() => {
          setSubmissionMessage("");
        }, 3000);
        await fetchEnrollments(); // Fetch updated enrollments after successful POST
      } else {
        console.error("Failed to submit enrollment data");
        setSubmissionMessage("Failed to submit enrollment data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage("An error occurred. Please try again.");
    }
  };




  const handleEdit = async (enrollmentId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/StudentEnrollment/${enrollmentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();

        setValues({
          Batch: result.data.batchId,
          Course: result.data.courseId,
          startDate: result.data.batchDetail.startDate,
          enrollmentStatus: result.data.enrollmentStatus,
          StudentId: result.data.studentId,
        });

        setIsEditing(true);
        setEditId(enrollmentId);

        // Fetch batches for the selected course
        await fetchBatches(result.data.courseId);
      } else {
        console.error("Failed to fetch enrollment data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    if (!validateFields()) {
      return;
    }

    const token = localStorage.getItem("token");


    const payload = {
      id: editId,
      batchId: values.Batch,
      courseId: values.Course,
      enrollmentStatus: values.enrollmentStatus,
      StudentId: id,
    };


    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/StudentEnrollment/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setValues({
          Batch: "",
          Course: "",
          startDate: "",
          enrollmentStatus: "",
        });
        setIsEditing(false);
        setEditId(null);
        setSubmissionMessage("Enrollment updated successfully!");
        setTimeout(() => {
          setSubmissionMessage("");
        }, 3000);
        await fetchEnrollments(); // Fetch updated enrollments after successful PUT
      } else {
        console.error("Failed to update enrollment data");
        setSubmissionMessage("Failed to update enrollment data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage("An error occurred. Please try again.");
    }
  };


  const handleCloseDelEnrollmentModal = () => {

    setDisplayDelEnrollmentModal(false);
    navigate(`/studentProfile/${students.id}`);

  }


  const handleDeleteSuccess =  (val) => {

    // console.log("val delete success " , val);
    setDeleteSuccess(true);

    if(val)
    {
      setTimeout(() => {

        // console.log('Navigating to:', `/studentProfile/${students.id}`);
        navigate(`/studentProfile/${students.id}`);
        // navigate(0);
        // fetchEnrollments();
     } , 4000)

    // fetchEnrollments();
    }
  

  }




  if (deleteSuccess)
    {
      setTimeout( () => {
        setDeleteSuccess(false);
        setDisplayDelEnrollmentModal(false);
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

  return (
    <>
      <div>
        <h1 style={{ margin: 15 }}>Student Enrollment</h1>
        <form className="form-styles">
          <div className="input-div-styles">
            <Label label="Course" />
            <select
              className="input-styles"
              name="Course"
              value={values.Course}
              onChange={handleInput}
            >
              <option value="" disabled>
                Select Course
              </option>
              {courses.map((course, index) => (
                <option key={index} value={course.id}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="input-div-styles">
            <Label label="Batch" />
            <select
              className="input-styles"
              name="Batch"
              value={values.Batch}
              onChange={handleInput}
            >
              <option value="" disabled>
                Select Batch
              </option>
              {Batch.map((batch, index) => (
                <option key={index} value={batch.id}>
                  {batch?.startDate
                    ? batch.startDate.substring(0, 10)
                    : batch.startDate}
                  &nbsp;&nbsp;-&nbsp;&nbsp;
                  {batch?.batchTitle ? batch.batchTitle : null}
                </option>
              ))}
            </select>
          </div>
          <div className="input-div-styles">
            <Label label="Enrollment Status" />
            <select
              className="input-styles"
              name="enrollmentStatus"
              value={values.enrollmentStatus}
              onChange={handleInput}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Enrolled">Enrolled</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginRight: "13%",
          }}
        >
          {isEditing ? (
            <Button
              button_type="primary"
              button_size="medium"
              text="Update"
              icon="left"
              onclick={handleUpdate}
            />
          ) : (
            <Button
              button_type="primary"
              button_size="medium"
              text="Enroll"
              icon="left"
              onclick={handleClick}
            />
          )}
        </div>
        <div style={{ marginTop: "-8vh", marginLeft: 15 }}>
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
              description="Please fill out all required fields."
            />
          )}
        </div>
        <div style={{ marginTop: "5vw", marginLeft: 20 }}>
          <table className="assessment-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Batch</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment, index) => {
                const courseTitle = enrollment.courseDetail?.courseTitle;
                const batchTitle = enrollment.batchDetail?.batchTitle || "N/A";
                const startDate = enrollment.batchDetail?.startDate
                  ? enrollment.batchDetail.startDate.substring(0, 10)
                  : "N/A";
                const enrollmentStatus = enrollment.enrollmentStatus || "N/A";

                return (
                  <tr key={index}>
                    <td>{courseTitle}</td>
                    <td>{batchTitle}</td>
                    <td>{startDate}</td>
                    <td>{enrollmentStatus}</td>
                    <td className="flex gap-x-2">
                      <button
                        onClick={() => handleEdit(enrollment.id)}
                        className="edit-button"
                      >
                        <img src={EditIcon} alt="Edit Icon" className="p-2" />
                      </button>
                      <Link to={`/studentProfile/${students.id}/deleteEnrollment/${enrollment.id}`} onClick={() => {setDisplayDelEnrollmentModal(true);}}>
                            <img src={TrashIcon} className="p-2" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        </div>

        

          <Modal
            isOpen={deleteSuccess ? false : displayDelEnrollmentModal}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DeleteEnrollment closeModal={handleCloseDelEnrollmentModal} onDelSuccess={handleDeleteSuccess}  refreshData={fetchEnrollments} />
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
};

export default StudentEnrollment;
