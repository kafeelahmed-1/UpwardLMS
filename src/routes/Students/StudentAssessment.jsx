import React, { useState, useEffect } from "react";
import Button from "../../components/Button/button.component";
import TrashIcon from "../../assets/trash.svg";
import { useParams , Link , useNavigate} from "react-router-dom";
import FileIcon from "../../assets/FileIcon.svg";
import FileNotExist from "../../assets/FileNotExist.svg";
import EditIcon from "../../assets/editIcon.svg";
import UpdateFile from "../Assessment/UpdateFile";
import Label from "../../components/Label/label.component";
import Alert from "../../components/Alert/alert.component";
import DeleteHistory from "./deleteAssessmentHistory.component";
import DelSuccess from "../../components/DeleteSuccessPopup/delSuccess.component";
import Modal from 'react-modal';


export const StudentAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assessmentTitle: "",
    assessmentDate: "",
    file: null,
    studentId: 0,
    fileId: 0,
  });

  const [scores, setScores] = useState([
    { id: 0, categoryId: "", Category: "", marks: 0 },
  ]);
  const [tableData, setTableData] = useState([]);
  console.log("assessment history table data :" , tableData);
  const [expandedRow, setExpandedRow] = useState(null);
  const [detailedScores, setDetailedScores] = useState({});
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentAssessmentId, setCurrentAssessmentId] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [allFieldsError, setAllFieldsError] = useState(false);
  const [displayDelHistoryModal , setDisplayDelHistoryModal] = useState('');
  const [deleteSuccess , setDeleteSuccess] = useState(false);
  const [students , setStudents] = useState([]);

  useEffect(() => {
    fetchData();
    fetchStudentData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/AssessmentScoreHead/Student/${id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        setTableData(result.data);
      } else {
        console.error("Failed to fetch data from API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }; // get all the data of AssessmentScoreHead on the basis of Student Id


  const fetchStudentData = async () => {
    const token = localStorage.getItem("token");
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



  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/MarksCategory?pageIndex=0&pageSize=123`
      );
      if (response.ok) {
        const result = await response.json();
        setCategories(result.data);
      } else {
        console.error("Failed to fetch categories from API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }; //get all marksCategory through MarksCategory endpoint

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleMarksInputChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...scores];
    values[index][name] = value;
    setScores(values);
  };

  const handleCategoryChange = (index, event) => {
    const { value } = event.target;
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(value)
    );
    const categoryText = selectedCategory ? selectedCategory.marksTitle : "";

    const values = [...scores];
    values[index].categoryId = value;
    values[index].Category = categoryText;
    values[index].id = 0;
    setScores(values);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    // if (name === "file") {
    //   setFormData({
    //     ...formData,
    //     file: files[0],
    //   });
    // } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }; //handle all the inputs i.e Assessment Title,Assessment Date,File Document

  const handleRemoveFields = async (index) => {
    const values = [...scores];
    const score = values[index];

    if (score.id === 0) {
      values.splice(index, 1);
      setScores(values);
    } else {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/AssessmentScoreDetail/${score.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          values.splice(index, 1);
          setScores(values);
        } else {
          console.error("Failed to delete score from API");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }; // remove the scores input on the basis of id if id =0 remove it from frontend else from endpoint

  const handleAddFields = () => {
    if (scores.length < categories.length) {
      setScores([...scores, { id: 0, categoryId: "", category: "", marks: 0 }]);
    }
  };

  const handleResumeUpload = async (e) => {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/FileDocument/File`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      const fileDocumentId = data.data.id;

      setFormData((prevStudentInfo) => ({
        ...prevStudentInfo,
        fileId: fileDocumentId,
        file: file.name,
      }));

      console.log(
        "File uploaded successfully. fileDocumentId:",
        fileDocumentId
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const fileId = formData.fileId;

    try {
      // Delete file from FileDocument
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/FileDocument/File/${fileId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Reset file related fields in formData
        setFormData((prevData) => ({
          ...prevData,
          file: null,
          fileId: 0,
        }));
        console.log("File deleted successfully.");
      } else {
        console.error("Failed to delete file from FileDocument");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["assessmentTitle", "assessmentDate"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      console.log(emptyFields.length);
      setSubmissionMessage("Enter Required Field...........!");
      setAllFieldsError(true);
      return;
    }

    // Check if scores array is not empty and all scores are valid
    if (
      scores.length === 0 ||
      scores.some(
        (score) => !score.categoryId || score.marks === null || score.marks < 0
      )
    ) {
      setSubmissionMessage("Please ensure all scores are valid and non-empty.");
      setAllFieldsError(true);
      return;
    }

    try {
      const payload = {
        id: editMode ? currentAssessmentId : 0,
        assessmentTitle: formData.assessmentTitle,
        assessmentDate: formData.assessmentDate,
        fileDocumentId: formData.fileId,
        studentId: id,
        createdDate: new Date().toISOString(),
        createdBy: 0,
        updatedDate: new Date().toISOString(),
        updatedBy: 0,
        scores: scores.map((score) => ({
          id: score.id,
          categoryId: String(score.categoryId),
          category: score.Category,
          marks: Number(score.marks),
        })),
      };

      let response;
      //put on the basis of editMode if true it must be update if false it must be post

      if (editMode) {
        const token = localStorage.getItem("token");

        // Update existing record
        response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/AssessmnetScoreHead/${currentAssessmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Create new record
        const token = localStorage.getItem("token");
        response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/AssessmentScoreHead`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
      }

      if (response.ok) {
        const result = await response.json();
        if (editMode) {
          setTableData((prevData) =>
            prevData.map((assessment) =>
              assessment.id === currentAssessmentId ? result.data : assessment
            )
          );
        } else {
          setTableData((prevData) => [...prevData, result.data]);
        }
        setFormData({
          assessmentTitle: "",
          assessmentDate: "",
          file: null,
          fileId: 0,
        });
        setScores([{ id: 0, categoryId: "", marks: 0 }]);
        setEditMode(false);
        setCurrentAssessmentId(null);
        setSubmissionMessage(
          editMode
            ? "Form updated successfully!"
            : "Form submitted successfully!"
        );
        setTimeout(() => {
          setSubmissionMessage("");
        }, 3000);
        setAllFieldsError(false);
      } else {
        const errorResponse = await response.json();
        console.error("Failed to submit data", errorResponse);
        setSubmissionMessage("Failed to submit data. Please try again.");
        setAllFieldsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage("An error occurred. Please try again.");
      setAllFieldsError(true);
    }
    await fetchData();
  };

  const handleExpandClick = async (rowId, assessmentId) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/AssessmentScoreHead/${assessmentId}/AssessmentScoreDetail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setDetailedScores((prevState) => ({
          ...prevState,
          [rowId]: result.data,
        }));

        setExpandedRow(rowId);
      } else {
        console.error("Failed to fetch detailed scores from API");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddFields();
    }
  };

  const handleDownload = (fileId, fileName) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/FileDocument/File/${fileId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  // const handleDelete = async (assessmentId) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/api/AssessmentScoreHead/${assessmentId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (response.ok) {
  //       setTableData((prevData) =>
  //         prevData.filter((assessment) => assessment.id !== assessmentId)
  //       );
  //     } else {
  //       console.error("Failed to delete data from API");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleEdit = async (assessmentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/AssessmentScoreHead/${assessmentId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const result = await response.json();
        let assessment = result.data;

        const date = new Date(assessment.assessmentDate);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

        setFormData({
          assessmentTitle: assessment.assessmentTitle,
          assessmentDate: formattedDate,
          file: assessment.resumeDocumentDetail
            ? assessment.resumeDocumentDetail.sourceFileName
            : null,
          fileId: assessment.resumeDocumentDetail
            ? assessment.resumeDocumentDetail.id
            : 0,
        });

        const scoreResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/AssessmentScoreHead/${assessmentId}/AssessmentScoreDetail`,
          {
            method: "GET",
          }
        );

        if (scoreResponse.ok) {
          const scoreResult = await scoreResponse.json();

          const scoresData = scoreResult.data;

          const updatedScores = scoresData.map((score) => {
            const category = categories.find(
              (cat) => cat.id === parseInt(score.marksCategoryId)
            );
            return {
              id: score.id,
              categoryId: score.marksCategoryId,
              Category: category ? category.marksTitle : "",
              marks: score.score,
            };
          });

          setScores(updatedScores);

          setEditMode(true);
          setCurrentAssessmentId(assessmentId);
        } else {
          console.error("Failed to fetch assessment score details for editing");
        }
      } else {
        console.error("Failed to fetch assessment data for editing");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleCloseDelHistoryModal = () => {
    setDisplayDelHistoryModal(false);
    navigate(`/studentProfile/${students.id}`);
  }

  const handleDeleteSuccess = (val) => {

    setDeleteSuccess(val);
    // console.log("delete success history" , val);
    
    if(val)
      {
        setTimeout(() => {
  
          console.log('Navigating to:', `/studentProfile/${students.id}`);
          navigate(`/studentProfile/${students.id}`);
          // navigate(0);
          // fetchEnrollments();
       } , 4000);
  
  }
}


  if (deleteSuccess)
    {
      setTimeout( () => {
        setDeleteSuccess(false);
        setDisplayDelHistoryModal(false);
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
    <div>
      <form className="form-styles" onSubmit={handleFormSubmit}>

        <div className="assessment-input-div-styles">
          {/* ASSESSMENT TITLE */}
          <div>
            <label className="text-xs text-textSecondary flex gap-x-1 gap-y-2">
              Assessment Title
            </label>
            <input
              placeholder="Enter Title"
              className={`${
                allFieldsError
                  ? "input-styles-error w-[232px]"
                  : "input-styles w-[232px]"
              }`}
              name="assessmentTitle"
              value={formData.assessmentTitle}
              onChange={handleInputChange}
            />
          </div>
          {/* ASSESSMENT DATE */}
          <div>
            <label className="text-xs text-textSecondary flex gap-x-1">
              Assessment Date
            </label>
            <input
              type="date"
              placeholder="Enter Date"
              className={`${
                allFieldsError
                  ? "input-styles-error w-[232px]"
                  : "input-styles w-[232px]"
              }`}
              name="assessmentDate"
              value={formData.assessmentDate}
              onChange={handleInputChange}
            />
          </div>
          {/* ATTACH FILE */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="text-xs text-textSecondary ">File Document</label>
            {formData.file ? (
              <UpdateFile
                fileId={formData.fileId}
                fileName={formData.file}
                onDelete={handleFileDelete}
              />
            ) : (
              <input
                type="file"
                className="input-styles w-[232px]"
                name="file"
                onChange={handleResumeUpload}
              />
            )}
          </div>
        </div>
        {/*------------------------- div 1 ends--------------------------------*/}

        <div className="flex flex-col">
          <label className="text-xs text-textSecondary flex gap-x-1 gap-y-2">
            Manual Assessment Link
          </label>
          <input type="text" placeholder="Enter URL" className="input-styles w-[735px]" />
        </div>



        {/* MARKS TABLE */}
        <table className="assessment-table">
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  onClick={handleAddFields}
                  style={{ width: 20 }}
                >
                  <p style={{ fontSize: 24 }}>+</p>
                </button>
                Marks Category
              </th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>
                  <select
                    name="categoryId"
                    className={`${
                      allFieldsError
                        ? "input-styles-error w-[232px]"
                        : "input-styles w-[232px]"
                    }`}
                    value={score.categoryId}
                    onChange={(event) => handleCategoryChange(index, event)}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) =>
                      category.marksTitle ? (
                        <option key={category.id} value={category.id}>
                          {category.marksTitle}
                        </option>
                      ) : null
                    )}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    name="marks"
                    placeholder="Score"
                    className="input-styles w-[232px]"
                    value={score.marks}
                    onChange={(event) => handleMarksInputChange(index, event)}
                    onKeyDown={handleKeyDown}
                  />
                </td>
                <td style={{ display: "flex", width: 235, height: 80 }}>
                  <button
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                    style={{ paddingLeft: 10 }}
                  >
                    <img src={TrashIcon} alt="Remove" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "27%",
        }}
      >
        <div
          style={{
            marginRight: "25%",
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
        <Button
          button_type="primary"
          button_size="medium"
          text={editMode ? "Update" : "Save"}
          icon="left"
          onclick={handleFormSubmit}
        />
      </div>
      <hr
        style={{
          width: "100%",
          borderTop: "1px solid rgb(157,163,174)",
          marginTop: 25,
        }}
      />
      <div style={{ margin: 25 }}>
        <h3
          style={{
            color: "#121826",
            fontWeight: 600,
            fontSize: 24,
            fontFamily: "Lato",
            margin: 0,
          }}
        >
          Assessment History
        </h3>
      </div>
      <div style={{ margin: "25px 25px 0px 25px"}}>
        <table className="assessment-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Total Marks</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <React.Fragment key={index}>
                <tr>
                  {row?.assessmentTitle ? (
                    <td>{row.assessmentTitle}</td>
                  ) : (
                    "N/A"
                  )}

                  {row?.assessmentDate ? (
                    <td>{row.assessmentDate?.substring(0, 10)}</td>
                  ) : (
                    "N/A"
                  )}

                  {row?.totalScore ? (
                    <td>{row.totalScore}</td>
                  ) : (
                    "N/A"
                  )}


                  <td className="p-2">
                    {row?.fileDocumentId ? (
                      <button
                        onClick={() =>
                          handleDownload(
                            row.fileDocumentId,
                            row.resumeDocumentDetail.sourceFileName
                          )
                        }
                      >
                        <img src={FileIcon} alt="File Icon" />
                      </button>
                    ) : (
                      <img src={FileNotExist} alt="File Not Exist Icon" />
                    )}
                  </td>

                  <td className="flex gap-x-2">
                    <button onClick={() => handleExpandClick(index, row.id)}>
                      <p style={{ width: 20, fontSize: 24 }}>
                        {expandedRow === index ? "-" : "+"}
                      </p>
                    </button>

                    <button
                      onClick={() => handleEdit(row.id)}
                      style={{ padding: 10 }}
                    >
                      <img src={EditIcon} alt="Edit" />
                    </button>
                    {/* assessment history delete button */}
                    {/* <button
                      onClick={() => handleDelete(row.id)}
                      style={{ padding: 10 }}
                    >
                      <img src={TrashIcon} alt="Delete" />
                    </button> */}
                    <Link to={`/studentProfile/${students?.id}/deleteHistory/${row?.id}`} onClick={() => {setDisplayDelHistoryModal(true);}}>
                        <img src={TrashIcon} className="p-2" />
                    </Link>
                  </td>
                </tr>
                {expandedRow === index && detailedScores[index] && (
                  <tr>
                    <td colSpan="5">
                      {detailedScores[index]?.length > 0 ? (
                        <table className="inner-table">
                          <thead>
                            <tr>
                              <th>Marks Category</th>
                              <th>Marks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detailedScores[index].map((score) =>
                              score.marksCatgeoryDetail?.marksTitle ? (
                                <tr key={score.id}>
                                  <td>
                                    {score.marksCatgeoryDetail.marksTitle}
                                  </td>
                                  <td>{score.score}</td>
                                </tr>
                              ) : null
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <p>No detailed scores available</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      
          <Modal
            isOpen={deleteSuccess ? false : displayDelHistoryModal}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DeleteHistory closeModal={handleCloseDelHistoryModal} onDelSuccess={handleDeleteSuccess}  refreshData={fetchData} />
          </Modal>

          
          {deleteSuccess && 
          <Modal
            isOpen={deleteSuccess ? true: false}
            style={customStyles}
            height="400px"
            width="fitContent"
          >
            <DelSuccess title="assessment history" />
          </Modal>}

    </div>
  );
};
