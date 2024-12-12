import EditQues from "./components/Question/editQues.component";
import QuestionPool from "./routes/QuestionPool/questionPool.component";
import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/MenuItems/menu.component";
import Dashboard from "./routes/Dashboard/dashboard.component";
import AddQues from "./components/Question/addQues.component";
import Accounts from "./routes/Accounts/accounts.component";
import Assessment from "./routes/Assessment/assessment.component";
import AddUser from "./components/UserData/addUser.component";
import "./App.css";
import Students from "./routes/Students/students.component";
import StudentCard from "./routes/Students/studentCard.component";
import AddStudent from "./components/StudentData/addStudent.component";
import EditStudent from "./components/StudentData/editStudent.component";
import DeleteStudent from "./components/StudentData/deleteStudent.component";
import AuthenticationPage from "./routes/Authentication/authentication.component";
import { UserAssessment } from "./routes/Assessment/UserAssessment";
import { AddNewAssessment } from "./routes/Assessment/AddNewAssessment";
import AssessmentSideBar from "./components/MenuItems/AssessmentSideBar";
import Registration from "./routes/Authentication/Registration";
import StudentDashBoard from "./routes/Students/StudentDashBoard";
import { StudentAssessmentCard } from "./routes/Students/StudentAssessmentCard";
import { StudentProfile } from "./routes/Students/StudentProfile";
import { StudentEnrollment } from "./routes/Students/StudentEnrollment";
import Categories from "./components/marksCategory/categories.component";
import AddCategory from "./components/marksCategory/addCategory.component";
import EditCategory from "./components/marksCategory/editCategory.component";
import DeleteCategory from "./components/marksCategory/delCategory.component";
import Batch from "./routes/Batchess/batch.component";
import AddBatch from "./components/batchCRUD/addBatch.component";
import EditBatch from "./components/batchCRUD/editBatch.component";
import DeleteBatch from "./components/batchCRUD/delBatch.component";
import Courses from "./routes/Courses/courses.component";
import AddCourse from "./components/CoursesCRUD/addCourse.component";
import EditCourse from "./components/CoursesCRUD/editCourse.component";
import DelCourse from "./components/CoursesCRUD/deleteCourse.component";
import AssignAssessment from "./routes/Assessment/assignAssessment.component";
import Enrollment from "./routes/Enrollment/enrollment.component";
import DeleteEnrollment from "./routes/Enrollment/deleteEnrollment.component";
import DeleteHistory from "./routes/Students/deleteAssessmentHistory.component";
// import EditAssessment from "./components/Assessments/editAssessment.component";
import Edit from "./components/Assessments/editForm.component";
import { EditAssessment_ } from "./components/Assessments/editAssessment_.component";


function App() {
  const location = useLocation();
  const shouldRenderAssessmentSideBar = location.pathname.includes("/addNewAssessment");
  const should_render_edit_assessment_menu = location.pathname.includes("/assessment/editAssessment");
  const isAuthenticatingPage = location.pathname === "/";

  const shouldRenderSideBarAndMenu = () => {
    return (
      !isAuthenticatingPage &&
      // !location.pathname.includes("/userAssessment") &&
      !location.pathname.includes("/addNewAssessment") &&
      !location.pathname.includes("/registration") &&
      !location.pathname.includes("/assessment/editAssessment")
    );
  };
  return (
    <div className="App">
      <div className="flex">

       {/*  menu div */}
        <div className="w-15 min-h-[100vh] h-[fitContent] py-10 border-r">
          {shouldRenderSideBarAndMenu() ? <Menu /> : null}
          {!location.pathname.includes("/userAssessment") ? (
            shouldRenderAssessmentSideBar || should_render_edit_assessment_menu ? (
              <AssessmentSideBar />
            ) : null
          ) : null}
        </div>

        {/* main pages */}
        <div className="w-full px-4">
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route path="registration" element={<Registration />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="accounts" element={<Accounts />}>
              <Route path="addUser" element={<AddUser />} />
              <Route path="editUser/:editUserId" />
              <Route path="deleteUser/:delUserId" />
            </Route>

            <Route path="assessment" element={<Assessment />}>
              <Route path="actions/:id" element={<Assessment />} />
              <Route path="deleteAssessment/:id" element={<Assessment />} />
            </Route>

            <Route path="assessment/assignAssessment" element={<AssignAssessment />} />

            {/* <Route path="addAssessment" element={<AddUser />} />
            </Route> */}
            <Route path="addNewAssessment" element={<AddNewAssessment />} />
            <Route path="assessment/editAssessment/:editId" element={<EditAssessment_ />} />
            {/* <Route path="assessment/edit/:id_" element={<Edit />} /> */}


            <Route path="questions" element={<QuestionPool />}>
              <Route path="actions/:id" element={<QuestionPool />} />
              <Route path="addQuestion" element={<AddQues />} />
              <Route path="deleteQuestion/:id" element={<QuestionPool />} />
              <Route path="editQues/:id" element={<EditQues />} />
            </Route>

            <Route path="students" element={<Students />}>
              <Route path="addStudent" element={<AddStudent />} />
              <Route path="editStudent/:id" element={<EditStudent />} />
              <Route path="deleteStudent/:id" element={<DeleteStudent />} />
            </Route>

            

            {/* ROUTE : marks category */}
            <Route path="marksCategories" element={<Categories />}>
              <Route path="addCategory" element={<AddCategory />} />
              <Route path="editCategory/:id" element={<EditCategory />} />
              <Route path="deleteCategory/:id" element={<DeleteCategory />} />
            </Route>

           {/*  ROUTE: batch  */}
            <Route path="batch" element={<Batch />}>
              <Route path="addBatch" element={<AddBatch />} />
              <Route path="editBatch/:id" element={<EditBatch />} />
              <Route path="deleteBatch/:id" element={<DeleteBatch />} />
            </Route>

           {/*  ROUTE : Courses */}
           <Route path="courses" element={<Courses />}>
              <Route path="addCourse" element={<AddCourse />} />
              <Route path="editCourse/:id" element={<EditCourse />}/>
              <Route path="deleteCourse/:id" element={<DelCourse />} />
            </Route>

            <Route path="studentDashBoard" element={<StudentDashBoard />} />
            <Route path="studentAssessmentCard/:id"element={<StudentAssessmentCard />}></Route>
            <Route path="userAssessment/:id" element={<UserAssessment />} />
            <Route path="studentProfile/:id" element={<StudentProfile />}>
              <Route path="deleteEnrollment/:deleteId" element={<DeleteEnrollment />} />
              <Route path="deleteHistory/:delHistoryId" element={<DeleteHistory/>} />
            </Route>


            <Route path="enrollment" element={<Enrollment />} />    

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
