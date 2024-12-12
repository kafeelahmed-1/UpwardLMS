import FormCross from '../../assets/form-cross.svg';
import FilterIcon from '../../assets/filterIcon.svg';
import SearchField from '../../components/SearchField/searchField.component';
import Button from '../../components/Button/button.component';
import ArrowDown from '../../assets/arrowDown.svg';
import EditIcon from '../../assets/editIcon.svg';
import TrashIcon from '../../assets/trash.svg';
import FileIcon from '../../assets/FileIcon.svg';
import FileNotExist from '../../assets/FileNotExist.svg';
import {Link } from 'react-router-dom';
import {useState, useEffect} from 'react';

const SelectStudents = ({ closeModal }) => {
  
  const [studentData , setStudentData] = useState([]);
  // console.log("STUDENT DATA :" , studentData);

  const [filteredStudents , setFilteredStudents] = useState([]);
  console.log('filtered students :'  , filteredStudents);

  const [search , setSearch] = useState('');
  // console.log("search is :" , search);

    //ARRAY
    let tableHead = [
      "",
      "Name",
      // "Father's Name",
      "Phone",
      "Email",
      "Qualification",
      "City",
      // "Status",
      "Actions",
      "Attachment"
    ];



  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log('TOKEN :' , token);

    fetch(`${process.env.REACT_APP_BASE_URL}/api/Student?pageIndex=0&pageSize=2000`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => setStudentData(data.data))
    .catch((error) => console.error("Error:", error));
  } , []);


  const handleCloseModal = () => {
    closeModal(false);
  };


  const handleCheckedStudents = (e) => {

    // console.log("is Checked ?" , e.target.checked);
    // console.log("id is :" , e.target.id);
    
    const filterSelectedStudents = studentData.filter(item => item.id == e.target.id);
    // console.log('is true ? ' , filterSelectedStudents);
    setFilteredStudents(prev => [...prev , filterSelectedStudents]);

  }


  const handleStudentsAddedToQueue = () => {
    alert("yooo!");

    console.log("BEFORE FETCH ");
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_BASE_URL}/api/assignAssessment`, {
      headers: {
        method: "POST",
        body: filteredStudents,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => console.log('posting selected students to quque', data))
    .catch((error) => console.error("Error:", error));
  }

  return(
    <>
      <div className="bg-white min-h-[550px] h-[fit-content] w-[1061px] rounded-lg border border-secondary">
        <div className="h-[60px] border-b border-secondary py-3 px-5 bg-default  flex justify-between">
            <p className="self-center text-xl font-semibold">Add New Students</p>
            <div className="self-center cursor-pointer" onClick={handleCloseModal}>
              <img src={FormCross} alt="img" />
            </div>
        </div>
        <div className='py-2 px-4 flex justify-between'>
          <SearchField />
          <div>
            <img src={FilterIcon} alt="filter icon" />
          </div>
        </div>
        <div className='px-4 flex flex-col gap-7'>
           
        <table
          className="border border-secondary"
          data-aos="fade-up"
          data-aos-duration="220"
        >
          <thead className="border-b border-secondary">
            <tr className="text-left bg-snowWhite">
              {tableHead.map((headings, i) => (
                <th
                  key={i}
                  className="py-3 px-2 text-sm text-textPrimary font-semibold"
                >
                  <div className="flex gap-x-2">
                    <p>{headings}</p>
                    <img src={ArrowDown} alt="Arrow Down" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {studentData.filter((item) => {
              return search.toLowerCase() == "" ? item : item.name;
                  
              }).map((item , i) => {
              return(
                <>
                  <tr    
                    className="text-sm text-sm text-textPrimary font-normal"
                    style={{
                      backgroundColor: i % 2 == 0 ? "transparent" : "#F3F4F6",
                    }}
                     key={item.id}
                  >    
                  <td className='px-[9px] pt-1'><input type="checkbox" id={item.id} onChange={handleCheckedStudents} className='rounded-sm w-4 h-4 border-2 border-secondary'/></td>  
                  <td className="p-1">
                    <Link to={`details/${item.id}`} className="student-link">
                      <span className="link-text" /*  onClick={handleStudentInfo} */>
                        {item.studentName}
                      </span>
                    </Link>
                  </td>
                  <td className="p-1">{item.contactNumber}</td>
                  <td className="p-1">{item.emailAddress}</td>
                  <td className="p-1">{item.qualification}</td>
                  <td className="p-1">{item.city}</td>
                  <td className="flex">
                    <Link to={`editStudent/${item.id}`}>
                      <img
                        src={EditIcon}
                        // onClick={handleEditStudentForm}
                        alt="Edit Icon"
                        className="p-2"
                      />
                    </Link>
                    <Link to={`deleteStudent/${item.id}`}>
                      <img
                        src={TrashIcon}
                        // onClick={() => setDisplayDeleteStudentPopup(true)}
                        alt="Trash Icon"
                        className="p-2"
                      />
                    </Link>
                  </td>
                  <td className="p-2">
                    {item.resumeDocumentId ? (
                      <button
                        // onClick={() =>
                        //   handleDownload(
                        //     item.resumeDocumentId,
                        //     item.resumeDocumentDetail.sourceFileName
                        //   )
                        // }
                      >
                        <img src={FileIcon} alt="File Icon" />
                      </button>
                     ) : (
                      <img src={FileNotExist} alt="File Not Exist Icon" />
                     )
                    }
                  </td>
                </tr>
                </>
              );
            })}
            
              
          </tbody>
        </table>{" "}

           <div className='border text-center'>
            pagination
           </div>
        </div>

        {/* button */}
        <div className='p-5 border w-[fit-content] mx-auto' onClick={handleStudentsAddedToQueue}>
           <Button button_type="primary" button_size="medium" text="Add in Queue" icon="none" />
        </div>
      </div>
    </>
  );
};

export default SelectStudents;

