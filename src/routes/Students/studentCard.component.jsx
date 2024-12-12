import FormTitle from "../../components/FormTitle/formTitle.component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DownloadIcon from "../../assets/download.svg";

const StudentCard = ({ closeStudentDetails }) => {
  const { id } = useParams();

  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/Students/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student details");
        }
        const data = await response.json();
        setStudentDetails(data.data);
        console.log("student Data", data.data);
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    };
    fetchStudentDetails();
  }, [id]);

  const onClose = () => {
    closeStudentDetails(false);
  };
  const handleDownloadResume = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/FileDocument/File/${studentDetails.resumeDocumentDetail.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch resume file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = studentDetails.resumeDocumentDetail.sourceFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };
  return (
    <>
      {/*  FORM DIV starts here */}
      <div className="text-sm">
        {/*   TITLE OF FORM */}
        {/* <FormTitle title="Student Details" formClosed={onClose} /> */}
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        {/*  FORM */}
        {loading && <div className="loader"></div>}
        {!loading && (
          <div className="form-styles">
            <div className="p-2 flex flex-col gap-y-2">
              {studentDetails && (
                <>
                  <div className="flex justify-between">
                    <p className="font-semibold">Name</p>
                    <p>{studentDetails.studentName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Father's Name</p>
                    <p>{studentDetails.fatherName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Phone</p>
                    <p>{studentDetails.contactNumber}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Qualification</p>
                    <p>{studentDetails.qualification}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">City</p>
                    <p>{studentDetails.city}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">CNIC</p>
                    <p>{studentDetails.cnic}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Email Address</p>
                    <p>{studentDetails.emailAddress}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Gender</p>
                    <p>{studentDetails.gender}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Area of Interest</p>
                    <p>{studentDetails.areaOfInterest}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Note</p>
                    <p>{studentDetails.note}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Experience</p>
                    <p>{studentDetails.experience}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Status</p>
                    <p>{studentDetails.status}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">CreatedDate</p>
                    <p>{studentDetails.status}</p>
                  </div>
                  {/* <div className="flex justify-between">
                  <p className="font-semibold">User Id</p>
                  <p>{studentDetails.userId}</p>
                </div> */}
                  {studentDetails && studentDetails.user && (
                    <>
                      <div className="flex justify-between">
                        <p className="font-semibold">User Email</p>
                        <p>{studentDetails.user.userEmail}</p>
                        {/* <p className="font-semibold">User Status</p>
                      <p>{studentDetails.user.status}</p> */}
                      </div>

                      {/* Render other user details */}
                    </>
                  )}

                  {/* <div className="flex justify-between">
                  <p className="font-semibold">Resume Id</p>
                  <p>{studentDetails.resumeDocumentId}</p>
                </div> */}
                  {studentDetails.resumeDocumentDetail && (
                    <div style={{ display: "flex" }}>
                      <p className="font-semibold">Resume Filename</p>
                      <div style={{ display: "flex", marginLeft: "50%" }}>
                        <p>
                          {studentDetails.resumeDocumentDetail.sourceFileName}
                        </p>
                        <button onClick={handleDownloadResume}>
                          <img
                            src={DownloadIcon}
                            alt="download"
                            style={{ width: 17, height: 17, marginLeft: 20 }}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}{" "}
        {/* form-styles and input-div-styles are custom tailwindcss classes in index.css */}
        {/* form ends here */}
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      </div>
      {/*   FORM DIV ends */}
      {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
    </>
  );
};

export default StudentCard;
