import MainHeading from "../../components/Header/header.component";
import { useEffect } from "react";
import { Navigation, useNavigate } from "react-router-dom";
// import MoreQuesPopup from '../../components/Question/moreQuesPopup.component';
// import DeleteQuesPopup from '../../components/Question/deleteQuesPopup.component';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="flex flex-col gap-y-4 py-10">
        <MainHeading title="Dashboard" />
        {/* <MoreQuesPopup />
            <DeleteQuesPopup /> */}
      </div>
    </>
  );
};

export default Dashboard;
