import { useParams } from "react-router-dom";
import DeleteStudentPopup from "./deletePopup.component";



const DeleteStudent = ({ closeDeleteStudentPopup, refreshStudents , onDeleteSuccess }) => {
  const { id } = useParams();
  console.log("delete student id :", id);



  const handlePopup = (value) => {
    closeDeleteStudentPopup(value);
  };

  const handleDeleteSuccess = (val) => {
    console.log("delete student:" , val);
    if (val)
    {
      closeDeleteStudentPopup(false);
    }
    onDeleteSuccess(val);
  }


  return (
    <>
      {/* <button className="bg-white py-4 px-2" onClick={handlePopup}>close</button> */}
      <DeleteStudentPopup
        onClose={handlePopup}
        deleteId={id}
        refreshStudents={refreshStudents}
        onDelete={handleDeleteSuccess}
      />

    </>
  );
};

export default DeleteStudent;
